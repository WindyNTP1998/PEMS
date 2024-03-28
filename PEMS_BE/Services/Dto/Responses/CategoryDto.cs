using Services.Entities;

namespace Services.Dto.Responses;

public class CategoryDto : PlatformEntityDto<Category, string>
{
    public CategoryDto()
    {
    }

    public CategoryDto(Category? entity)
    {
        Id = entity?.Id;
        Name = entity?.Name ?? string.Empty;
        Slug = entity?.Slug ?? string.Empty;
        IsActive = entity?.IsActive ?? false;
        Level = entity?.Level ?? 0;
        CategoryImageUrl = entity?.CategoryImageUrl ?? string.Empty;
        ParentId = entity?.ParentId;
        CreatedDate = entity?.CreatedDate ?? DateTime.UtcNow;
        LastUpdatedDate = entity?.LastUpdatedDate ?? DateTime.UtcNow;
        CreatedBy = entity?.CreatedBy;
        LastUpdatedBy = entity?.LastUpdatedBy;
        IsRootCategory = entity?.IsRootCategory ?? false;
        FullPathSlug = entity?.FullPathSlug ?? entity?.Slug ?? string.Empty;
    }

    public string? Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public bool IsActive { get; set; }
    public int Level { get; set; }
    public string CategoryImageUrl { get; set; }
    public string? ParentId { get; set; }
    public string? FullPathSlug { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? LastUpdatedBy { get; set; }
    public bool IsRootCategory { get; set; }

    //navigate
    public List<CategoryDto>? ChildCategories { get; set; }
    public CategoryDto? ParentCategory { get; set; }

    public List<ProductDto>? Products { get; set; }

    protected override Category MapToEntity(Category entity, MapToEntityModes mode)
    {
        entity.Id = (mode == MapToEntityModes.MapNewEntity || IsSubmitToCreate()
            ? Guid.NewGuid().ToString()
            : Id)!;
        entity.Name = Name;
        entity.Slug = Slug;
        entity.IsActive = IsActive;
        entity.Level = Level;
        entity.CategoryImageUrl = CategoryImageUrl;
        entity.ParentId = ParentId;
        entity.IsRootCategory = IsRootCategory;
        entity.CreatedDate = mode == MapToEntityModes.MapNewEntity || IsSubmitToCreate()
            ? DateTime.UtcNow
            : entity.CreatedDate;
        entity.LastUpdatedDate = DateTime.UtcNow;
        entity.CreatedBy = CreatedBy;
        entity.LastUpdatedBy = LastUpdatedBy;
        return entity;
    }

    protected override object? GetSubmittedId()
    {
        return Id;
    }

    public CategoryDto WithParentCategoryDto(CategoryDto parentCategory)
    {
        ParentCategory = parentCategory;
        return this;
    }

    public CategoryDto WithProducts(List<ProductDto> products)
    {
        Products = products;
        return this;
    }

    public CategoryDto WithChildCategories(List<CategoryDto> childCategories)
    {
        ChildCategories = childCategories;
        return this;
    }
}