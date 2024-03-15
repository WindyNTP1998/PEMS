using System.Text.Json.Serialization;

namespace Services.Entities;

public class Category : BaseEntity<string>
{
	public Category() : base(Guid.NewGuid().ToString())
	{
	}

	public string Name { get; set; }
	public string Slug { get; set; }
	public string FullPathSlug { get; set; }
	public bool IsActive { get; set; }
	public int Level { get; set; }
	public string CategoryImageUrl { get; set; }
	public string? ParentId { get; set; }
	public bool IsRootCategory { get; set; }

	public DateTime CreatedDate { get; set; }
	public DateTime LastUpdatedDate { get; set; }
	public string? CreatedBy { get; set; }
	public string? LastUpdatedBy { get; set; }

	[JsonIgnore]
	public ICollection<Category>? ChildCategories { get; set; }

	[JsonIgnore]
	public Category? ParentCategory { get; set; }

	[JsonIgnore]
	public ICollection<ProductCategory>? ProductCategories { get; set; }
}