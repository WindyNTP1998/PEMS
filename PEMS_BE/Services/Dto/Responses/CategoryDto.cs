using Services.Entities;

namespace Services.Dto.Responses;

public class CategoryDto : PlatformEntityDto<Category, string>
{
	public CategoryDto()
	{
	}

	public CategoryDto(Category entity)
	{
		Id = entity.Id;
		Name = entity.Name;
		Slug = entity.Slug;
		IsActive = entity.IsActive;
		Level = entity.Level;
		CategoryImageUrl = entity.CategoryImageUrl;
		ParentId = entity.ParentId;
		CreatedDate = entity.CreatedDate;
		LastUpdatedDate = entity.LastUpdatedDate;
		CreatedBy = entity.CreatedBy;
		LastUpdatedBy = entity.LastUpdatedBy;
	}

	public string? Id { get; set; }
	public string Name { get; set; }
	public string Slug { get; set; }
	public bool IsActive { get; set; }
	public int Level { get; set; }
	public string CategoryImageUrl { get; set; }
	public string? ParentId { get; set; }

	public DateTime CreatedDate { get; set; }
	public DateTime LastUpdatedDate { get; set; }
	public string? CreatedBy { get; set; }
	public string? LastUpdatedBy { get; set; }

	//navigate
	public List<CategoryDto>? ChildCategories { get; set; }
	public CategoryDto? ParentCategories { get; set; }

	protected override Category MapToEntity(Category entity, MapToEntityModes mode)
	{
		entity.Id = (mode == MapToEntityModes.MapNewEntity || IsSubmitToCreate() ? Guid.NewGuid().ToString() : Id)!;
		entity.Name = Name;
		entity.Slug = entity.ReplaceLastSlugPart(Slug);
		entity.IsActive = IsActive;
		entity.Level = Level;
		entity.CategoryImageUrl = CategoryImageUrl;
		entity.ParentId = ParentId;
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
		ParentCategories = parentCategory;
		return this;
	}
}