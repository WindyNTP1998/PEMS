using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using Services.Entities;
using Services.Entities.ValueObject;

namespace Services.Data.EntityConfiguration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
	public void Configure(EntityTypeBuilder<Product> builder)
	{
		builder.HasIndex(p => new { p.BrandId, p.Id });
		builder.HasIndex(p => p.Name).IsUnique();
		builder.HasIndex(p => p.Code).IsUnique();
		builder.HasIndex(p => p.Slug).IsUnique();
		builder.HasIndex(p => p.FullPathSlug).IsUnique();
		builder.HasIndex(p => p.LastUpdatedDate);

		// builder
		// 	.Property(p => p.ImageUrls)
		// 	.HasColumnType("jsonb")
		// 	.HasDefaultValue(new List<string>())
		// 	.HasConversion(
		// 		v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
		// 		v => JsonConvert
		// 			     .DeserializeObject<List<string>>(
		// 				     v,
		// 				     new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }) ??
		// 		     new List<string>()); 

		builder.HasOne(prod => prod.Brand)
			.WithMany(brand => brand.Products)
			.HasForeignKey(prod => prod.BrandId)
			.OnDelete(DeleteBehavior.SetNull);

		builder.Property(p => p.PackageUnit)
			.HasConversion(new EnumToStringConverter<PackageUnit>());
		builder.Property(p => p.ProductForm)
			.HasConversion(new EnumToStringConverter<ProductForm>());
	}
}