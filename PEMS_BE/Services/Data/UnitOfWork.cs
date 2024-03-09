using Services.Data.Repository;

namespace Services.Data;

public interface IUnitOfWork
{
	IBrandRepository Brands { get; }
	ICategoryRepository Categories { get; }

	Task<bool> CompleteAsync();
}

public class UnitOfWork : IUnitOfWork
{
	private readonly ApplicationDbContext _context;

	public UnitOfWork(ApplicationDbContext context, ILoggerFactory loggerFactory)
	{
		_context = context;
		var logger = loggerFactory.CreateLogger("logs");

		Brands = new BrandRepository(_context, logger as ILogger<BrandRepository>);
		Categories = new CategoryRepository(_context, logger as ILogger<CategoryRepository>);
	}

	public IBrandRepository Brands { get; }

	public ICategoryRepository Categories { get; }

	public async Task<bool> CompleteAsync()
	{
		var result = await _context.SaveChangesAsync();
		return result > 0;
	}
}