using System.Text.Json.Serialization;

namespace Services.Entities;

public class ProductCategory : BaseEntity<string>
{
	public ProductCategory() : base(Guid.NewGuid().ToString())
	{
	}

	public string Id { get; set; }
	public string CategoryId { get; set; }
	public string ProductId { get; set; }

	[JsonIgnore]
	public Category? Category { get; set; }

	[JsonIgnore]
	public Product? Product { get; set; }
}