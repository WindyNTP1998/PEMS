using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Entities;

namespace Services.Data.EntityConfiguration;

public class ProductCategoryConfiguration : IEntityTypeConfiguration<ProductCategory>
{
	public void Configure(EntityTypeBuilder<ProductCategory> builder)
	{
		builder.HasIndex(p => new { p.CategoryId, p.Id });
		builder.HasIndex(p => new { p.ProductId, p.Id });
		builder.HasIndex(p => new { p.CategoryId, p.ProductId }).IsUnique();

		builder.HasOne(p => p.Category)
			.WithMany(cate => cate.ProductCategories)
			.HasForeignKey(p => p.CategoryId)
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasOne(p => p.Product)
			.WithMany(prod => prod.ProductCategories)
			.HasForeignKey(p => p.ProductId)
			.OnDelete(DeleteBehavior.Cascade);
	}
}