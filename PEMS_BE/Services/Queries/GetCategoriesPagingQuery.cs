using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Services.Data;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;
using Services.Platform;

namespace Services.Queries;

public enum CategoryOrderBy
{
	LastUpdateDate,
	Level
}

public enum OrderDirection
{
	Asc,
	Desc
}

public class GetCategoriesPagingQuery : PlatformCqrsPagedQuery, IRequest<GetCategoriesPagingQueryResult>
{
	public CategoryOrderBy OrderBy { get; set; } = CategoryOrderBy.LastUpdateDate;
	public OrderDirection OrderDirection { get; set; } = OrderDirection.Asc;
}

public class GetCategoriesPagingQueryResult : PlatformCqrsQueryPagedResult<CategoryDto>
{
	public GetCategoriesPagingQueryResult(
		List<CategoryDto> items,
		long totalCount,
		PlatformCqrsPagedQuery pagedRequest) : base(items, totalCount, pagedRequest)
	{
	}
}

public class GetCategoriesPagingQueryHandler : IRequestHandler<GetCategoriesPagingQuery, GetCategoriesPagingQueryResult>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;

	public GetCategoriesPagingQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
	}

	public async Task<GetCategoriesPagingQueryResult> Handle(GetCategoriesPagingQuery request, CancellationToken cancellationToken)
	{
		var categories = await _unitOfWork.Categories.GetAllAsync(query =>
			query.Where(x => x.IsActive)
				.Include(x => x.ParentCategory)
				.Include(x => x.ChildCategories)
				.Pipe(query => request.OrderBy == CategoryOrderBy.LastUpdateDate
					? query.OrderBy(p => p.LastUpdatedDate)
					: query.OrderBy(p => p.Level).ThenBy(p => p.LastUpdatedDate))
				.PipeIf(request.IsPagedRequestValid(),
					_ => _.PageBy(request.SkipCount, request.MaxResultCount))
		);
		var categoryCount = await _unitOfWork.Categories.CountAsync(query =>
			query.Where(x => x.IsActive)
		);

		var categoriesDto = categories
			.Select(x => new CategoryDto(x)
				.WithIf(p => x.ParentCategory != null, p => p.WithParentCategoryDto(new CategoryDto(x.ParentCategory!))))
			.ToList();

		return new GetCategoriesPagingQueryResult(categoriesDto, categoryCount, request);
	}
}