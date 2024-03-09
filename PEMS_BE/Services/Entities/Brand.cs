namespace Services.Entities;

public class Brand : BaseEntity<string>
{
    public Brand(
        string id,
        string name,
        string from,
        string manufacturer,
        string countryOfManufacturer,
        DateTime createdDate,
        DateTime lastUpdatedDate,
        string? createdBy,
        string? lastUpdatedBy) : base(id)
    {
        Name = name;
        From = from;
        Manufacturer = manufacturer;
        CountryOfManufacturer = countryOfManufacturer;
        CreatedDate = createdDate;
        LastUpdatedDate = lastUpdatedDate;
        CreatedBy = createdBy;
        LastUpdatedBy = lastUpdatedBy;
    }

    public string Name { get; set; }
    public string From { get; set; }
    public string Manufacturer { get; set; }
    public string CountryOfManufacturer { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? LastUpdatedBy { get; set; }
}