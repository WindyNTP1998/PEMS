namespace Services.Entities;

public class AddressAggregate : BaseEntity<string>
{
    public AddressAggregate(
        string id,
        string? street,
        string? city,
        string? state,
        string? postalCode,
        string? country,
        double? latitude,
        double? longitude,
        string? placeId,
        DateTime createdDate,
        DateTime lastUpdatedDate,
        string? createdBy,
        string? lastUpdatedBy) : base(id)
    {
        Street = street;
        City = city;
        State = state;
        PostalCode = postalCode;
        Country = country;
        Latitude = latitude;
        Longitude = longitude;
        PlaceId = placeId;
        CreatedDate = createdDate;
        LastUpdatedDate = lastUpdatedDate;
        CreatedBy = createdBy;
        LastUpdatedBy = lastUpdatedBy;
    }

    public string? Street { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }

    // Additional properties to interface with Google's location services:
    public double? Latitude { get; set; } // Latitude obtained from Google's Geocoding API
    public double? Longitude { get; set; } // Longitude obtained from Google's Geocoding API
    public string? PlaceId { get; set; } // Google's unique identifier for a place

    public DateTime CreatedDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? LastUpdatedBy { get; set; }
}