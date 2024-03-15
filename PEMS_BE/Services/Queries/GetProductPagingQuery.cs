using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Services.Data.Repository;
using Services.Dto;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;
using Services.Platform;

namespace Services.Queries;

public enum ProductOrderBy
{
	Price,
	Name,
	Newest
}

public class GetProductPagingQuery : PlatformCqrsPagedQuery, IRequest<GetProductPagingQueryResult>
{
	public string SearchText { get; set; } = string.Empty;
	public OrderDirection OrderDirection { get; set; } = OrderDirection.Asc;
	public List<string> CategoryIds { get; set; } = [];
	public List<string> BrandIds { get; set; } = [];
	public ProductOrderBy ProductOrderBy { get; set; } = ProductOrderBy.Newest;
	public bool WithBrand { get; set; } = false;
	public bool WithCategories { get; set; } = false;

	public Expression<Func<Product, object>> GetProductOrderByExpression()
	{
		return ProductOrderBy switch
		{
			ProductOrderBy.Price => x => x.Price,
			ProductOrderBy.Name => x => x.Name,
			ProductOrderBy.Newest => x => x.LastUpdatedDate,
			_ => x => x.LastUpdatedDate
		};
	}
}

public class GetProductPagingQueryResult : PlatformCqrsQueryPagedResult<ProductDto>
{
	public GetProductPagingQueryResult(
		List<ProductDto> items,
		long totalCount,
		PlatformCqrsPagedQuery pagedRequest,
		IProductRepository productRepository) : base(items, totalCount, pagedRequest)
	{
	}
}

public class GetProductPagingQueryHandler : IRequestHandler<GetProductPagingQuery, GetProductPagingQueryResult>
{
	private readonly IProductRepository _productRepository;

	public GetProductPagingQueryHandler(IProductRepository productRepository)
	{
		_productRepository = productRepository;
	}

	public async Task<GetProductPagingQueryResult> Handle(GetProductPagingQuery request, CancellationToken cancellationToken)
	{
		var getProductQueryBuilder = _productRepository.GetQueryBuilder(query =>
			query.Where(x => x.IsPublish)
				.Pipe(orderQuery => request.OrderDirection == OrderDirection.Asc
					? orderQuery.OrderBy(request.GetProductOrderByExpression())
					: orderQuery.OrderByDescending(request.GetProductOrderByExpression()))
				.WhereIf(request.BrandIds.Any(), x => request.BrandIds.Contains(x.BrandId))
				.WhereIf(request.CategoryIds.Any(), x => x.ProductCategories!.Any(pc => request.CategoryIds.Contains(pc.CategoryId)))
				.WhereIf(!string.IsNullOrWhiteSpace(request.SearchText),
					x => EF.Functions.Like(x.Name.ToLower(), $"%{request.SearchText.ToLower()}%"))
		);

		var products = await _productRepository.GetAllAsync(query => getProductQueryBuilder(query)
			.IncludeIf(request.WithBrand, prod => prod.Brand)
			.IncludeIf(request.WithCategories, prod => prod.ProductCategories!, pc => pc.Category!)
			.PipeIf(request.IsPagedRequestValid(), _ => _.PageBy(request.SkipCount, request.MaxResultCount))
		);

		var productCount = await _productRepository.CountAsync(query => getProductQueryBuilder(query));

		var results = products.Select(x => new ProductDto(x)
				.WithIf(request.WithBrand, p => p.Brand = new BrandDto(x.Brand!))
				.WithIf(request.WithCategories,
					p => p.Categories = x.ProductCategories!.Select(pc => new CategoryDto(pc.Category))
						.ToList())
			)
			.ToList();

		return new GetProductPagingQueryResult(results, productCount, request, _productRepository);
	}
}