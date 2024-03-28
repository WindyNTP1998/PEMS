using AutoMapper;
using MediatR;
using Services.Data;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;

namespace Services.Command;

public class CreateCategoryCommand : IRequest<CategoryDto>
{
    public string Name { get; set; } = string.Empty;
    public string? ParentId { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string CategoryImageUrl { get; set; } = string.Empty;
}

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    private readonly IUnitOfWork _unitOfWork;

    public CreateCategoryCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var parentCategory = request.ParentId.IsNotNullOrEmpty()
            ? await _unitOfWork.Categories.GetAsync(query => query.Where(x => x.Id == request.ParentId))
            : null;

        var toCreateCategory = new Category
        {
            CategoryImageUrl = request.CategoryImageUrl,
            Name = request.Name,
            IsActive = true,
            Slug = request.Slug,
            ParentId = request.ParentId,
            Level = parentCategory == null ? 1 : parentCategory.Level + 1,
            CreatedBy = "System",
            CreatedDate = DateTime.UtcNow,
            LastUpdatedDate = DateTime.UtcNow,
            LastUpdatedBy = "System",
            FullPathSlug = $"{parentCategory?.Slug}/{request.Slug}"
        };

        var createdCategory = await _unitOfWork.Categories.CreateAsync(toCreateCategory);

        await _unitOfWork.CompleteAsync();

        return new CategoryDto(createdCategory);
    }
}