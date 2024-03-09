using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Services.Entities;

namespace Services.Data.Repository;

public interface IBrandRepository : IGenericRepository<Brand>
{
	Task<List<Brand>> GetAllWithQueryAsync(
		Func<IQueryable<Brand>, IEnumerable<Brand>> queryBuilder,
		params Expression<Func<Brand, object>>[] includeProperties);
}

public class BrandRepository : GenericRepository<Brand>, IBrandRepository
{
	public BrandRepository(ApplicationDbContext context, ILogger<BrandRepository> logger) : base(context, logger)
	{
	}

	public override async Task<IEnumerable<Brand>> GetAllAsync()
	{
		try
		{
			return await _dbSet
				.Where(x => x.CreatedDate <= DateTime.Now)
				.AsNoTracking()
				.AsSplitQuery()
				.OrderBy(x => x.Id)
				.ToListAsync();
		}
		catch (Exception e)
		{
			_logger.LogError(e, "{Repo} All function error", typeof(BrandRepository));
			throw;
		}
	}

	public Task<List<Brand>> GetAllWithQueryAsync(
		Func<IQueryable<Brand>, IEnumerable<Brand>> queryBuilder,
		params Expression<Func<Brand, object>>[] includeProperties)
	{
		throw new NotImplementedException();
	}
}