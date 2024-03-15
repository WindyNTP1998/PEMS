using MediatR;
using Microsoft.EntityFrameworkCore;
using Services.Data.Repository;
using Services.Dto;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;

namespace Services.Queries;

public class GetProductQuery : IRequest<ProductDto>
{
	public string Id { get; set; } = string.Empty;
	public bool WithBrand { get; set; } = false;
	public bool WithCategories { get; set; } = false;
}

public class GetProductQueryHandler : IRequestHandler<GetProductQuery, ProductDto>
{
	private readonly IProductRepository _productRepository;
	private readonly IProductCategoryRepository _productCategoryRepository;

	public GetProductQueryHandler(
		IProductRepository productRepository,
		ICategoryRepository categoryRepository,
		IBrandRepository brandRepository,
		IProductCategoryRepository productCategoryRepository)
	{
		_productRepository = productRepository;
		_productCategoryRepository = productCategoryRepository;
	}

	public async Task<ProductDto> Handle(GetProductQuery request, CancellationToken cancellationToken)
	{
		var product = await _productRepository
			.GetAsync(
				query => query
					.Where(prod => prod.Id == request.Id)
					.IncludeIf(request.WithBrand, prod => prod.Brand)
					.IncludeIf(request.WithCategories, prod => prod.ProductCategories!, pc => pc.Category!)
			);

		if (product == null)
			throw new Exception($"Product not Found with ID: {request.Id}");

		return new ProductDto(product)
			.WithIf(request.WithBrand, p => p.Brand = new BrandDto(product.Brand!))
			.WithIf(request.WithCategories, p => p.Categories = product.ProductCategories!.Select(pc => new CategoryDto(pc.Category)).ToList());
	}
}