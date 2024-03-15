using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Services.Entities;

namespace Services.Data.Repository;

public interface IProductRepository : IGenericRepository<Product>
{
}

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
	public ProductRepository(ApplicationDbContext context, ILogger<GenericRepository<Product>> logger) : base(context, logger)
	{
	}
}