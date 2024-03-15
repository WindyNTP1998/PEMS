using Services.Entities;
using Services.Extensions;

namespace Services.Dto;

public abstract class PlatformEntityDto<TEntity, TKey> where TEntity : BaseEntity<TKey>
{
	public virtual TEntity MapToNewEntity()
	{
		var initialEntity = Activator.CreateInstance<TEntity>();
		var updatedEntity = MapToEntity(initialEntity, MapToEntityModes.MapAllProps);

		return updatedEntity;
	}

	protected abstract TEntity MapToEntity(TEntity entity, MapToEntityModes mode);

	public virtual TEntity UpdateToEntity(TEntity toBeUpdatedEntity)
	{
		return MapToEntity(toBeUpdatedEntity, MapToEntityModes.MapToUpdateExistingEntity);
	}

	protected abstract object? GetSubmittedId();

	public virtual bool IsSubmitToUpdate()
	{
		if (GetSubmittedId() is null or default(object?)) return false;

		return GetSubmittedId() switch
		{
			string strId => strId.IsNotNullOrEmpty(),
			Guid guidId => guidId != Guid.Empty,
			long longId => longId != default,
			int intId => intId != default,
			_ => false
		};
	}

	public virtual bool IsSubmitToCreate()
	{
		return !IsSubmitToUpdate();
	}
}

public enum MapToEntityModes
{
	MapAllProps,
	MapNewEntity,
	MapToUpdateExistingEntity
}