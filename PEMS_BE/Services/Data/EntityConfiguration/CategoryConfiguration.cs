using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Entities;

namespace Services.Data.EntityConfiguration;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
	public void Configure(EntityTypeBuilder<Category> builder)
	{
		builder.HasIndex(p => p.Id);
		builder.HasIndex(p => p.Slug);
		builder.HasIndex(p => p.LastUpdatedDate);
		builder.HasMany(p => p.ChildCategories)
			.WithOne(p => p.ParentCategory)
			.HasForeignKey(p => p.ParentId)
			.OnDelete(DeleteBehavior.SetNull);
	}
}