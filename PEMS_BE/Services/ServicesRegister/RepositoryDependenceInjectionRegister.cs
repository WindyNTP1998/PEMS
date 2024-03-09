using Services.Data;
using Services.Data.Repository;
using Services.Services.Token;

namespace Services.ServicesRegister;

public static class RepositoryDependenceInjectionRegisterExtensions
{
	public static void RepositoryDependenceInjectionRegister(this IServiceCollection services)
	{
		services.AddSingleton<ILoggerFactory, LoggerFactory>();
		services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));
		services.AddScoped<IBrandRepository, BrandRepository>();
		services.AddScoped<ICategoryRepository, CategoryRepository>();

		services.AddScoped<TokenServices>();
		services.AddScoped<IUnitOfWork, UnitOfWork>();
	}
}