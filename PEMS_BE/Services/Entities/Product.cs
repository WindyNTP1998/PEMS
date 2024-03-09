using Services.Entities.ValueObject;

namespace Services.Entities;

public class Product : BaseEntity<string>
{
    public Product(
        string id,
        bool isPublish,
        ProductForm productForm,
        double productRanking,
        Brand? brand,
        Category? category,
        DateTime createdDate,
        DateTime lastUpdatedDate,
        string? createdBy,
        string? lastUpdatedBy) : base(id)
    {
        IsPublish = isPublish;
        ProductForm = productForm;
        ProductRanking = productRanking;
        Brand = brand;
        Category = category;
        CreatedDate = createdDate;
        LastUpdatedDate = lastUpdatedDate;
        CreatedBy = createdBy;
        LastUpdatedBy = lastUpdatedBy;
    }

    public string Name { get; set; } = string.Empty;
    public string BarCode { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsPublish { get; set; } = true;
    public ProductForm ProductForm { get; set; } = ProductForm.Box;
    public double ProductRanking { get; set; } = 5.0;
    public string ShortDescription { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Specification { get; set; } = string.Empty;
    public string WebName { get; set; } = string.Empty;
    public string RegisterNumber { get; set; } = string.Empty;

    //Navigation
    public string BrandId { get; set; } = string.Empty;
    public Brand? Brand { get; set; }
    public string CategoryId { get; set; } = string.Empty;
    public Category? Category { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? LastUpdatedBy { get; set; }
}