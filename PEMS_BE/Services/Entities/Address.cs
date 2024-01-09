namespace Services.Entities;

public class AddressAggregate : AuditedEntity<string>
{
    public string? Street { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }

    // Additional properties to interface with Google's location services:
    public double? Latitude { get; set; } // Latitude obtained from Google's Geocoding API
    public double? Longitude { get; set; } // Longitude obtained from Google's Geocoding API
    public string? PlaceId { get; set; } // Google's unique identifier for a place
}