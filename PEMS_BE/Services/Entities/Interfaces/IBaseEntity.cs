namespace Services.Entities.Interfaces;

public interface IBaseEntity
{
    string Id { get; protected set; }
}