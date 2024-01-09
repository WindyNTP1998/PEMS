namespace Services.Entities;

public class AuditedEntity<T> : BaseEntity<T>
{
    public DateTime CreatedDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? LastUpdatedBy { get; set; }
}