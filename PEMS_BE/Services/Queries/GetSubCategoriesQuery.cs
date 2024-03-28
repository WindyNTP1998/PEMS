using MediatR;
using Services.Data.Repository;
using Services.Dto.Responses;
using Services.Extensions;

namespace Services.Queries;

public class GetSubCategoriesQuery : IRequest<List<CategoryDto>>
{
    public string Id { get; set; } = string.Empty;
    public bool WithSubCategories { get; set; } = false;
}

public class GetSubCategoriesQueryHandler : IRequestHandler<GetSubCategoriesQuery, List<CategoryDto>>
{
    private readonly ICategoryRepository _categoryRepository;


    public GetSubCategoriesQueryHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<CategoryDto>> Handle(GetSubCategoriesQuery request, CancellationToken cancellationToken)
    {
        var subCategories = await _categoryRepository.GetAllAsync(query =>
            query
                .Where(c => c.ParentId == request.Id)
                .Include(p => p.ProductCategories!, x => x.Product!)
                .Select(p => new
                {
                    category = p,
                    products = p.ProductCategories!.Select(p => p.Product),
                    childCategories = p.ChildCategories
                })
        );

        return subCategories.Select(c =>
                new CategoryDto(c.category)
                    .WithProducts(c.products.Select(x => new ProductDto(x)).ToList())
                    .WithIf(request.WithSubCategories && c.childCategories != null,
                        x => x.WithChildCategories(c.childCategories!.Select(p => new CategoryDto(p)).ToList()))
            )
            .ToList();
    }
}