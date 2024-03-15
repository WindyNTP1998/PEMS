using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Services.Entities;

namespace Services.Data.Repository;

public interface IBrandRepository : IGenericRepository<Brand>
{
}

public class BrandRepository : GenericRepository<Brand>, IBrandRepository
{
	public BrandRepository(ApplicationDbContext context, ILogger<BrandRepository> logger) : base(context, logger)
	{
	}
}