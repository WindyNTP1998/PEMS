using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Services.Data;

public interface IGenericRepository<T>
	where T : class
{
	IQueryable<T> GetQuery(params Expression<Func<T, object?>>[] loadRelatedEntities);
	Func<IQueryable<T>, IQueryable<T>> GetQueryBuilder(Expression<Func<T, bool>> predicate);
	Func<IQueryable<T>, IQueryable<TResult>> GetQueryBuilder<TResult>(Func<IQueryable<T>, IQueryable<TResult>> builderFn);

	Task<List<T>> GetAllAsync(
		Func<IQueryable<T>, IQueryable<T>>? queryBuilder,
		params Expression<Func<T, object>>[] includeProperties);

	// Task<List<TSelector>> GetAllAsync<TSelector>(
	// 	Func<IQueryable<T>, IQueryable<TSelector>>? queryBuilder,
	// 	params Expression<Func<T, object>>[] includeProperties); 
	Task<T?> GetAsync(
		Func<IQueryable<T>, IQueryable<T>>? queryBuilder,
		params Expression<Func<T, object>>[] includeProperties);

	Task<T?> GetAsync(
		Expression<Func<T, bool>> predicate,
		params Expression<Func<T, object>>[] includeProperties);

	Task<T> CreateAsync(T entity);
	Task<List<T>> CreateManyAsync(List<T> entities);

	Task UpdateAsync(T entity);
	Task<List<T>> UpdateManyAsync(List<T> entities);

	Task RemoveAsync(T entity);
	Task RemoveManyAsync(List<T> entities);

	Task<int> CountAsync(Func<IQueryable<T>, IQueryable<T>> queryBuilder);

	Task SaveChangesAsync();
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

	public IQueryable<T> GetQuery(params Expression<Func<T, object?>>[] loadRelatedEntities)
	{
		return _dbSet.AsQueryable();
	}

	public Func<IQueryable<T>, IQueryable<T>> GetQueryBuilder(Expression<Func<T, bool>> predicate)
	{
		return query => query.Where(predicate);
	}

	public Func<IQueryable<T>, IQueryable<TResult>> GetQueryBuilder<TResult>(Func<IQueryable<T>, IQueryable<TResult>> builderFn)
	{
		return builderFn;
	}

	public virtual async Task<List<T>> GetAllAsync(
		Func<IQueryable<T>, IQueryable<T>>? queryBuilder,
		params Expression<Func<T, object>>[] includeProperties)
	{
		IQueryable<T> query = _dbSet;

		// Bổ sung các trường vào bảng kết quả nếu được cung cấp
		if (includeProperties != null)
			foreach (var includeProperty in includeProperties)
				query = query.Include(includeProperty);

		// Thêm AsNoTracking và AsSplitQuery trước khi thực hiện truy vấn
		query = query
			.AsNoTracking()
			.AsSplitQuery();

		// Sử dụng queryBuilder để xây dựng truy vấn LINQ động\
		if (queryBuilder != null)
			query = queryBuilder(query);

		return await query.ToListAsync();
	}

	public virtual async Task<T?> GetAsync(
		Func<IQueryable<T>, IQueryable<T>>? queryBuilder,
		params Expression<Func<T, object>>[] includeProperties)
	{
		IQueryable<T> query = _dbSet;

		if (includeProperties != null)
			foreach (var includeProperty in includeProperties)
				query = query.Include(includeProperty);

		if (queryBuilder != null)
			query = queryBuilder(query)
				.AsNoTracking()
				.AsSplitQuery();

		return await query.FirstOrDefaultAsync();
	}

	public async Task<T?> GetAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
	{
		IQueryable<T> query = _dbSet;

		if (includeProperties != null)
			foreach (var includeProperty in includeProperties)
				query = query.Include(includeProperty);

		return await query.FirstOrDefaultAsync(predicate);
	}

	public virtual async Task<T> CreateAsync(T entity)
	{
		if (entity == null) throw new ArgumentNullException(nameof(entity));
		await _dbSet.AddAsync(entity);
		return entity;
	}

	public virtual async Task UpdateAsync(T entity)
	{
		if (entity == null) throw new ArgumentNullException(nameof(entity));
		_dbSet.Update(entity);
	}

	public virtual async Task RemoveAsync(T entity)
	{
		if (entity == null) throw new ArgumentNullException(nameof(entity));
		_dbSet.Remove(entity);
	}

	public virtual async Task<int> CountAsync(Func<IQueryable<T>, IQueryable<T>> queryBuilder)
	{
		IQueryable<T> query = _dbSet;

		query = queryBuilder(query);

		return await query.CountAsync();
	}

	public virtual async Task SaveChangesAsync()
	{
		await _context.SaveChangesAsync();
	}

	public virtual async Task<List<T>> CreateManyAsync(List<T> entities)
	{
		if (entities == null) throw new ArgumentNullException(nameof(entities));

		await _dbSet.AddRangeAsync(entities);

		return entities;
	}

	public virtual async Task<List<T>> UpdateManyAsync(List<T> entities)
	{
		if (entities == null) throw new ArgumentNullException(nameof(entities));

		_dbSet.UpdateRange(entities);

		return entities;
	}

	public virtual async Task RemoveManyAsync(List<T> entities)
	{
		if (entities == null) throw new ArgumentNullException(nameof(entities));

		_dbSet.RemoveRange(entities);
	}
}