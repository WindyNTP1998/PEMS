using Services.Entities;

namespace Services.Dto;

public class BrandDto : PlatformEntityDto<Brand, string>
{
    public BrandDto()
    {
    }

    public BrandDto(Brand brandEntity)
    {
        Id = brandEntity.Id;
        Name = brandEntity.Name;
        From = brandEntity.From;
        Manufacturer = brandEntity.Manufacturer;
        CountryOfManufacturer = brandEntity.CountryOfManufacturer;
        CreatedDate = brandEntity.CreatedDate;
        LastUpdatedDate = brandEntity.LastUpdatedDate;
        CreatedBy = brandEntity.CreatedBy;
        LastUpdatedBy = brandEntity.LastUpdatedBy;
    }

    public string? Id { get; set; }
    public string Name { get; set; }
    public string From { get; set; }
    public string Manufacturer { get; set; }
    public string CountryOfManufacturer { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? LastUpdatedBy { get; set; }

    protected override Brand MapToEntity(Brand entity, MapToEntityModes mode)
    {
        entity.Id = (mode == MapToEntityModes.MapNewEntity || IsSubmitToCreate() ? Guid.NewGuid().ToString() : Id)!;
        entity.Name = Name;
        entity.From = From;
        entity.Manufacturer = Manufacturer;
        entity.CountryOfManufacturer = CountryOfManufacturer;
        entity.CreatedDate = mode == MapToEntityModes.MapNewEntity || IsSubmitToCreate()
            ? DateTime.UtcNow
            : entity.CreatedDate;
        entity.LastUpdatedDate = DateTime.UtcNow;
        return entity;
    }

    protected override object? GetSubmittedId()
    {
        return Id;
    }
}