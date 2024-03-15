using Services.Entities;
using Services.Entities.ValueObject;

namespace Services.Dto.Responses;

public class ProductDto : PlatformEntityDto<Product, string>
{
	public ProductDto()
	{
	}

	public ProductDto(Product? entity)
	{
		Id = entity?.Id;
		Name = entity?.Name ?? string.Empty;
		Code = entity?.Code ?? string.Empty;
		ImageUrls = entity?.ImageUrls ?? [];
		IsPublish = entity?.IsPublish ?? true;
		PackageUnit = entity?.PackageUnit ?? PackageUnit.Blister;
		ProductForm = entity?.ProductForm ?? ProductForm.Box;
		ProductRanking = entity?.ProductRanking ?? 5.0;
		ShortDescription = entity?.ShortDescription ?? string.Empty;
		Description = entity?.Description ?? string.Empty;
		Slug = entity?.Slug ?? string.Empty;
		Specification = entity?.Specification ?? string.Empty;
		WebName = entity?.WebName ?? string.Empty;
		RegisterNumber = entity?.RegisterNumber ?? string.Empty;
		Price = entity?.Price ?? 0.0;
		BrandId = entity?.BrandId ?? string.Empty;
		CreatedDate = entity?.CreatedDate ?? DateTime.UtcNow;
		LastUpdatedDate = entity?.LastUpdatedDate ?? DateTime.UtcNow;
		CreatedBy = entity?.CreatedBy;
		LastUpdatedBy = entity?.LastUpdatedBy;
	}

	public string? Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public string Code { get; set; } = string.Empty;
	public List<string> ImageUrls { get; set; } = [];
	public bool IsPublish { get; set; } = true;
	public PackageUnit PackageUnit { get; set; } = PackageUnit.Blister;
	public ProductForm ProductForm { get; set; } = ProductForm.Box;
	public double ProductRanking { get; set; } = 5.0;
	public string ShortDescription { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public string Slug { get; set; } = string.Empty;
	public string Specification { get; set; } = string.Empty;
	public string WebName { get; set; } = string.Empty;
	public string RegisterNumber { get; set; } = string.Empty;

	public double Price { get; set; } = 0.0;

	//Navigation
	public string BrandId { get; set; } = string.Empty;
	public DateTime CreatedDate { get; set; }
	public DateTime LastUpdatedDate { get; set; }
	public string? CreatedBy { get; set; }
	public string? LastUpdatedBy { get; set; }

	//Navigation
	public BrandDto? Brand { get; set; }
	public List<CategoryDto>? Categories { get; set; }

	public ProductDto WithAssociatedBrand(BrandDto brand)
	{
		Brand = brand;
		return this;
	}

	public ProductDto WithAssociatedCategories(List<CategoryDto> categories)
	{
		Categories = categories;
		return this;
	}

	protected override Product MapToEntity(Product entity, MapToEntityModes mode)
	{
		entity.Id = (mode == MapToEntityModes.MapNewEntity || IsSubmitToCreate() ? Guid.NewGuid().ToString() : Id)!;
		entity.Name = Name;
		entity.Code = Code;
		entity.ImageUrls = ImageUrls;
		entity.IsPublish = IsPublish;
		entity.PackageUnit = PackageUnit;
		entity.ProductForm = ProductForm;
		entity.ProductRanking = ProductRanking;
		entity.ShortDescription = ShortDescription;
		entity.Description = Description;
		entity.Slug = Slug;
		entity.Specification = Specification;
		entity.WebName = WebName;
		entity.RegisterNumber = RegisterNumber;
		entity.Price = Price;
		entity.BrandId = BrandId;
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
}