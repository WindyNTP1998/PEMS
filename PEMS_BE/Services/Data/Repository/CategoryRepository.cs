using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Services.Entities;

namespace Services.Data.Repository;

public interface ICategoryRepository : IGenericRepository<Category>
{
	Task<List<Category>> GetAllWithQueryAsync(
		Func<IQueryable<Category>, IEnumerable<Category>> queryBuilder,
		params Expression<Func<Category, object>>[] includeProperties);

	Task<int> CountAllAsync(Func<IQueryable<Category>, IEnumerable<Category>> queryBuilder);
}

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
	public CategoryRepository(ApplicationDbContext context, ILogger<CategoryRepository> logger) : base(context, logger)
	{
	}

	public override async Task<IEnumerable<Category>> GetAllAsync()
	{
		return await _dbSet
			.Where(x => x.IsActive)
			.AsNoTracking()
			.AsSplitQuery()
			.OrderByDescending(x => x.LastUpdatedDate)
			.ToListAsync();
	}

	public async Task<List<Category>> GetAllWithQueryAsync(
		Func<IQueryable<Category>, IEnumerable<Category>> queryBuilder,
		params Expression<Func<Category, object>>[] includeProperties)
	{
		// Tạo một IQueryable cho DbSet Category
		IQueryable<Category> query = _dbSet;

		// Bao gồm các thuộc tính nếu được chỉ định
		foreach (var includeProperty in includeProperties) query = query.Include(includeProperty);

		// Thực thi queryBuilder nếu được cung cấp
		if (queryBuilder != null) query = (IQueryable<Category>)queryBuilder(query);

		// Sử dụng AsNoTracking nếu bạn không muốn theo dõi các thay đổi trong kết quả truy vấn
		// query = query.AsNoTracking();

		// Thực hiện truy vấn và trả về danh sách kết quả
		return await query
			.AsNoTracking()
			.AsSplitQuery()
			.ToListAsync();
	}

	public async Task<int> CountAllAsync(Func<IQueryable<Category>, IEnumerable<Category>> queryBuilder)
	{
		var query = _dbSet
			.AsNoTracking()
			.AsSplitQuery();
		if (queryBuilder != null) query = (IQueryable<Category>)queryBuilder(query);
		return await query.CountAsync();
	}
}