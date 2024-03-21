using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Constants;
using Services.Data;
using Services.Entities;
using Services.Entities.ValueObject;

namespace Services.ServicesRegister;

public static class Migration
{
	public static async Task Migrate(this WebApplication webApplication)
	{
		using var scope = webApplication.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
		await dbContext.Database.MigrateAsync();
	}

	public static async Task SeedDataAsync(this WebApplication webApplication)
	{
		using (var scope = webApplication.Services.CreateScope())
		{
			var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

			var roles = new[]
			{
				ApplicationRoles.User,
				ApplicationRoles.Admin,
				ApplicationRoles.SupperAdmin,
				ApplicationRoles.Customer,
				ApplicationRoles.CustomerAdmin
			};

			foreach (var role in roles)
				if (!await roleManager.RoleExistsAsync(role))
					await roleManager.CreateAsync(new IdentityRole(role));
		}

		using (var scope = webApplication.Services.CreateScope())
		{
			var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
			const string adminEmail = "supperAdmin@mailinator.com";

			var isExistedAdminAccount = await userManager.FindByEmailAsync(adminEmail);
			if (isExistedAdminAccount == null)
			{
				var supperAdmin = new ApplicationUser
				{
					Email = adminEmail,
					Gender = Gender.Male,
					Id = "1",
					LastName = "Admin",
					FirstName = "Supper",
					BirthDate = new DateOnly(1998, 04, 15),
					IsActive = true,
					IsConfirmed = true,
					UserName = "supperAdmin@mailinator.com"
				};
				var roles = new List<string>
				{
					ApplicationRoles.User,
					ApplicationRoles.Admin,
					ApplicationRoles.SupperAdmin,
					ApplicationRoles.CustomerAdmin
				};
				var password = "Admin@123";

				await userManager.CreateAsync(supperAdmin, password);
				await userManager.AddToRolesAsync(supperAdmin, roles);
			}
		}

		using (var scope = webApplication.Services.CreateScope())
		{
			var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

			var rootCategories = new List<Category>()
			{
				new()
				{
					Id = "41c578b3-eb8f-4010-8e91-fc13c40908dd",
					Name = "Thực phẩm chức năng",
					Slug = "thuc-pham-chuc-nang",
					FullPathSlug = "thuc-pham-chuc-nang",
					IsActive = true,
					Level = 1,
					CategoryImageUrl = "https://robohash.org/43f630af60a1ab5699ae7eb38ab67b16?set=set4&bgset=&size=400x400",
					CreatedDate = DateTime.UtcNow,
					LastUpdatedDate = DateTime.UtcNow,
					CreatedBy = "system",
					LastUpdatedBy = "system",
					ParentId = null,
					IsRootCategory = true
				},
				new()
				{
					Id = "595916cb-6cc2-4e67-9adc-0b4ade12f0cc",
					Name = "Dược Mỹ Phẩm",
					Slug = "duoc-my-pham",
					FullPathSlug = "duoc-my-pham",
					IsActive = true,
					Level = 1,
					CategoryImageUrl = "https://robohash.org/03fe907c18dbf1e19eb03a4714ededf7?set=set4&bgset=&size=400x400",
					CreatedDate = DateTime.UtcNow,
					LastUpdatedDate = DateTime.UtcNow,
					CreatedBy = "system",
					LastUpdatedBy = "system",
					ParentId = null,
					IsRootCategory = true
				},
				new()
				{
					Id = "a29902f2-2c92-4896-a9b9-c5df5c58d3ec",
					Name = "Thuốc",
					Slug = "thuoc",
					FullPathSlug = "thuoc",
					IsActive = true,
					Level = 1,
					CategoryImageUrl = "https://robohash.org/fb956cc21259a8a9165c0f3c731cfaf6?set=set4&bgset=&size=400x400",
					CreatedDate = DateTime.UtcNow,
					LastUpdatedDate = DateTime.UtcNow,
					CreatedBy = "system",
					LastUpdatedBy = "system",
					ParentId = null,
					IsRootCategory = true
				},
				new()
				{
					Id = "ea2ac7e1-b93d-4ac7-9f64-ec8b89df311d",
					Name = "Dụng cụ y tế",
					Slug = "dung-cu-y-te",
					FullPathSlug = "dung-cu-y-te",
					IsActive = true,
					Level = 1,
					CategoryImageUrl = "https://robohash.org/3b837fe0f10c2c31dcc52a20ea9c218b?set=set4&bgset=&size=400x400",
					CreatedDate = DateTime.UtcNow,
					LastUpdatedDate = DateTime.UtcNow,
					CreatedBy = "system",
					LastUpdatedBy = "system",
					ParentId = null,
					IsRootCategory = true
				}
			};

			foreach (var item in rootCategories)
				if (!await context.Category.AnyAsync(x => x.Id == item.Id))
					await context.Category.AddRangeAsync(item);
			await context.SaveChangesAsync();
		}
	}
}