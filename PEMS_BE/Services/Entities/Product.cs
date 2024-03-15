using System.Text.Json.Serialization;
using Services.Dto.Responses;
using Services.Entities.ValueObject;

namespace Services.Entities;

public class Product : BaseEntity<string>
{
	public Product() : base(Guid.NewGuid().ToString())
	{
	}

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

	//Example: A/B/C
	public string FullPathSlug { get; set; } = string.Empty;
	public string Specification { get; set; } = string.Empty;
	public string WebName { get; set; } = string.Empty;
	public string RegisterNumber { get; set; } = string.Empty;
	public double Price { get; set; } = 0.0;

	//Navigation
	public string BrandId { get; set; } = string.Empty;

	[JsonIgnore]
	public ICollection<ProductCategory>? ProductCategories { get; set; }

	[JsonIgnore]
	public Brand? Brand { get; set; }

	public DateTime CreatedDate { get; set; }
	public DateTime LastUpdatedDate { get; set; }
	public string? CreatedBy { get; set; }
	public string? LastUpdatedBy { get; set; }
}