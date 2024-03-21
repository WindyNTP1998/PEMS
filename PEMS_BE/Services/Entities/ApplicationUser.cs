using Microsoft.AspNetCore.Identity;
using Services.Entities.ValueObject;

namespace Services.Entities;

public class ApplicationUser : IdentityUser
{
	//Basic Info
	public required string FirstName { get; set; }
	public required string LastName { get; set; }
	public Gender Gender { get; set; } = Gender.Male;
	public string? MiddleName { get; set; }
	public string? FullName { get; set; }
	
	public string? IdentityId { get; set; } 
	public string? ProfileImageLink { get; set; }
	public DateOnly? BirthDate { get; set; }
	public string? Nationality { get; set; }
	public string? Occupation { get; set; }
	public string? SecondaryEmail { get; set; }
	public bool IsActive { get; set; } = true;
	public bool IsConfirmed { get; set; } = true;
	public DateTime LastLoginDate { get; set; } = DateTime.UtcNow;
	public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
	public string? CreatedBy { get; set; }
	public DateTime? LastUpdatedDate { get; set; } = DateTime.UtcNow;
	public string? LastUpdatedBy { get; set; }

	
}