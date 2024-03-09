using Microsoft.EntityFrameworkCore;

namespace Services.Data;

public interface IGenericRepository<T>
	where T : class
{
	Task<IEnumerable<T>> GetAllAsync();
	Task<T?> GetByIdAsync(string id);

	Task<T> Insert(T entity);
	Task Update(T entity);
	Task Delete(T entity);
	Task<int> CountAsync();
}

public class GenericRepository<T> : IGenericRepository<T>
	where T : class
{
	private readonly ApplicationDbContext _context;
	internal readonly DbSet<T> _dbSet;
	public readonly ILogger _logger;

	public GenericRepository(ApplicationDbContext context, ILogger<GenericRepository<T>> logger)
	{
		_context = context;
		_logger = logger;
		_dbSet = context.Set<T>();
	}

	public virtual async Task<IEnumerable<T>> GetAllAsync()
	{
		return _dbSet.AsEnumerable();
	}

	public virtual async Task<T?> GetByIdAsync(string id)
	{
		return await _dbSet.FindAsync(id);
	}

	public virtual async Task<T> Insert(T entity)
	{
		if (entity == null) throw new ArgumentNullException(nameof(entity));
		await _dbSet.AddAsync(entity);
		return entity;
	}

	public virtual async Task Update(T entity)
	{
		if (entity == null) throw new ArgumentNullException(nameof(entity));
		_dbSet.Entry(entity).State = EntityState.Modified;
		_dbSet.Entry(entity).CurrentValues.SetValues(entity);
	}

	public virtual async Task Delete(T entity)
	{
		if (entity == null) throw new ArgumentNullException(nameof(entity));
		_dbSet.Remove(entity);
	}

	public async Task<int> CountAsync()
	{
		return await _context.Set<T>().CountAsync();
	}
}