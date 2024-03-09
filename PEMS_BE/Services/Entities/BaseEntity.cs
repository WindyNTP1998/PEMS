namespace Services.Entities;

public abstract class BaseEntity<TEntityId>
{
    protected BaseEntity(TEntityId id)
    {
        Id = id;
    }

    public TEntityId Id { get; set; }
}