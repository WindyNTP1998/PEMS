using Services.Entities;

namespace Services.Data.Repository;

public interface IProductCategoryRepository : IGenericRepository<ProductCategory>
{
}

public class ProductCategoryRepository : GenericRepository<ProductCategory>, IProductCategoryRepository
{
	public ProductCategoryRepository(ApplicationDbContext context, ILogger<GenericRepository<ProductCategory>> logger) : base(context, logger)
	{
	}
}