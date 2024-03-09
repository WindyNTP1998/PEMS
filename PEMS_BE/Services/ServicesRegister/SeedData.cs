using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Constants;
using Services.Data;
using Services.Entities;
using Services.Entities.ValueObject;

namespace Services.ServicesRegister;

public static class SeedData
{
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
					LastName = "SupperAdmin",
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
				new(
					"41c578b3-eb8f-4010-8e91-fc13c40908dd",
					"Thực phẩm chức năng",
					"thuc-pham-chuc-nang",
					true,
					1,
					"https://robohash.org/43f630af60a1ab5699ae7eb38ab67b16?set=set4&bgset=&size=400x400",
					DateTime.UtcNow,
					DateTime.UtcNow,
					"system",
					"system",
					null),
				new(
					"595916cb-6cc2-4e67-9adc-0b4ade12f0cc",
					"Dược Mỹ Phẩm",
					"duoc-my-pham",
					true,
					1,
					"https://robohash.org/03fe907c18dbf1e19eb03a4714ededf7?set=set4&bgset=&size=400x400",
					DateTime.UtcNow,
					DateTime.UtcNow,
					"system",
					"system",
					null),
				new(
					"a29902f2-2c92-4896-a9b9-c5df5c58d3ec",
					"Thuốc",
					"thuoc",
					true,
					1,
					"https://robohash.org/fb956cc21259a8a9165c0f3c731cfaf6?set=set4&bgset=&size=400x400",
					DateTime.UtcNow,
					DateTime.UtcNow,
					"system",
					"system",
					null),
				new(
					"ea2ac7e1-b93d-4ac7-9f64-ec8b89df311d",
					"Dụng cụ y tế",
					"dung-cu-y-te",
					true,
					1,
					"https://robohash.org/3b837fe0f10c2c31dcc52a20ea9c218b?set=set4&bgset=&size=400x400",
					DateTime.UtcNow,
					DateTime.UtcNow,
					"system",
					"system",
					null)
			};

			foreach (var item in rootCategories)
				if (!await context.Category.AnyAsync(x => x.Id == item.Id))
					await context.Category.AddRangeAsync(item);
			await context.SaveChangesAsync();
		}
	}
}