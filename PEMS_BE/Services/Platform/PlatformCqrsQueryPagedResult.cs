namespace Services.Platform;

public interface IPlatformCqrsQueryPagedResult<TItem>
{
	List<TItem> Items { get; set; }
	long TotalCount { get; set; }
	int? PageSize { get; set; }
	int? SkipCount { get; set; }
	int? TotalPages { get; }
	int? PageIndex { get; }

	public int? GetPageIndex()
	{
		if (SkipCount == null || PageSize == null || PageSize <= 0 || SkipCount < 0) return null;

		return (SkipCount.Value / PageSize.Value) + 1;
	}
}

public class PlatformCqrsQueryPagedResult<TItem> : IPlatformCqrsQueryPagedResult<TItem>
{
	protected PlatformCqrsQueryPagedResult() { }

	public PlatformCqrsQueryPagedResult(List<TItem> items, long totalCount, PlatformCqrsPagedQuery pagedRequest)
	{
		Items = items;
		TotalCount = totalCount;
		PageSize = pagedRequest.MaxResultCount;
		SkipCount = pagedRequest.SkipCount;
	}

	public List<TItem> Items { get; set; }
	public long TotalCount { get; set; }
	public int? PageSize { get; set; }
	public int? SkipCount { get; set; }

	public int? TotalPages =>
		(PageSize.HasValue && PageSize != 0)
			? (int)Math.Ceiling((decimal)TotalCount / PageSize.Value)
			: (int?)null;

	public int? PageIndex =>
		(SkipCount == null || PageSize == null || PageSize <= 0 || SkipCount < 0)
			? null
			: (SkipCount.Value / PageSize.Value) + 1;
}