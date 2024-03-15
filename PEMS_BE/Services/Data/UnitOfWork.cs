using Services.Data.Repository;

namespace Services.Data;

public interface IUnitOfWork
{
	IBrandRepository Brands { get; }
	ICategoryRepository Categories { get; }
	IProductRepository Products { get; }
	IProductCategoryRepository ProductCategory { get; }

	Task<bool> CompleteAsync();
}

public class UnitOfWork : IUnitOfWork
{
	private readonly ApplicationDbContext _context;

	public UnitOfWork(
		ApplicationDbContext context,
		ILoggerFactory loggerFactory,
		IProductRepository products,
		IProductCategoryRepository productCategory,
		ICategoryRepository categories,
		IBrandRepository brands)
	{
		_context = context;
		Products = products;
		ProductCategory = productCategory;
		Categories = categories;
		Brands = brands;
		var logger = loggerFactory.CreateLogger("logs");
	}

	public IBrandRepository Brands { get; }

	public ICategoryRepository Categories { get; }
	public IProductRepository Products { get; }
	public IProductCategoryRepository ProductCategory { get; }

	public async Task<bool> CompleteAsync()
	{
		var result = await _context.SaveChangesAsync();
		return result > 0;
	}
}