using System.Text.Json.Serialization;

namespace Services.Entities;

public class Category : BaseEntity<string>
{
	public Category() : base(Guid.NewGuid().ToString())
	{
	}

	public Category(
		string id,
		string name,
		string slug,
		bool isActive,
		int level,
		string categoryImageUrl,
		DateTime createdDate,
		DateTime lastUpdatedDate,
		string? createdBy,
		string? lastUpdatedBy,
		string? parentId) : base(id)
	{
		Name = name;
		Slug = slug;
		IsActive = isActive;
		Level = level;
		CategoryImageUrl = categoryImageUrl;
		CreatedDate = createdDate;
		LastUpdatedDate = lastUpdatedDate;
		CreatedBy = createdBy;
		LastUpdatedBy = lastUpdatedBy;
		ParentId = parentId;
	}

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

	[JsonIgnore]
	public ICollection<Category>? ChildCategories { get; set; }

	[JsonIgnore]
	public Category? ParentCategory { get; set; }

	public string ReplaceLastSlugPart(string newSlug)
	{
		var slugParts = Slug.Split("/");
		slugParts[^1] = newSlug;
		return string.Join("/", slugParts);
	}
}