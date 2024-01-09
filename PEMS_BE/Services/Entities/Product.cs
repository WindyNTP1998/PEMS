namespace Services.Entities;

public class Product : AuditedEntity<string>
{
    public string Name { get; set; } = string.Empty;
    public string BarCode { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ProductUnit ProductUnit { get; set; }


    public string? ProductContent { get; set; } = string.Empty;
    public double Price { get; set; }
}

public enum ProductUnit
{
    Box,
    Tube,
    Bag,
    Piece,
    Ampoules,
    Bottle,
    Can,
    Blister
}