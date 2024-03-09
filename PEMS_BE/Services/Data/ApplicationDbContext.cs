using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Services.Data.EntityConfiguration;
using Services.Entities;

namespace Services.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

	//Add DB set
	public DbSet<Brand> Brand { get; set; }
	public DbSet<Category> Category { get; set; }

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);

		//Add configuration
		builder.ApplyConfiguration(new ApplicationUserConfiguration());
		builder.ApplyConfiguration(new BrandConfiguration());
		builder.ApplyConfiguration(new CategoryConfiguration());
	}
}