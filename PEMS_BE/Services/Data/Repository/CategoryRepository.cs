using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Services.Entities;

namespace Services.Data.Repository;

public interface ICategoryRepository : IGenericRepository<Category>
{
}

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
	public CategoryRepository(ApplicationDbContext context, ILogger<CategoryRepository> logger) : base(context, logger)
	{
	}
}