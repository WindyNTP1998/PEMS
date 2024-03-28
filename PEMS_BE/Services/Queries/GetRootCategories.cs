using MediatR;
using Services.Data.Repository;
using Services.Dto.Responses;

namespace Services.Queries;

public class GetRootCategories : IRequest<List<CategoryDto>>
{
}

public class GetRootCategoriesHandler : IRequestHandler<GetRootCategories, List<CategoryDto>>
{
    private readonly ICategoryRepository _categoryRepository;

    public GetRootCategoriesHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<CategoryDto>> Handle(GetRootCategories request, CancellationToken cancellationToken)
    {
        var rootCategories = await _categoryRepository.GetAllAsync(query => query.Where(p => p.IsRootCategory));

        return rootCategories.Select(c => new CategoryDto(c)).ToList();
    }
}