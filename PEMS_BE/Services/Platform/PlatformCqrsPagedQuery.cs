using MediatR;

namespace Services.Platform;

public abstract class PlatformCqrsPagedQuery
{
	public virtual int? SkipCount { get; set; }
	public virtual int? MaxResultCount { get; set; }

	public bool IsPagedRequestValid()
	{
		return (SkipCount == null || SkipCount >= 0) && (MaxResultCount == null || MaxResultCount >= 0);
	}
}