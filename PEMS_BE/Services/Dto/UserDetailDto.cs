using Services.Entities.ValueObject;

namespace Services.Dto;

public class UserDetailDto
{
	public string UserName { get; set; } = string.Empty;
	public string Email { get; set; } = string.Empty;
	public string? PhoneNumber { get; set; } = string.Empty;
	public string? FirstName { get; set; }
	public string? MiddleName { get; set; }
	public string LastName { get; set; } = string.Empty;
	public string IdentityId { get; set; } = string.Empty;
	public string? ProfileImageLink { get; set; }
	public DateOnly BirthDate { get; set; }
	public string? Nationality { get; set; }
	public string? Occupation { get; set; }
	public Gender Gender { get; set; } = Gender.Male;
	public string? SecondaryEmail { get; set; }
	public bool IsActive { get; set; }
	public bool IsConfirmed { get; set; }
	public DateTime LastLoginDate { get; set; } = DateTime.UtcNow;
	public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
	public string? CreatedBy { get; set; }
	public DateTime? LastUpdatedDate { get; set; } = DateTime.UtcNow;
	public string? LastUpdatedBy { get; set; }
	public string? FullName { get; set; }
}