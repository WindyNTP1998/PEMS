using Services.Constants;
using Services.Entities.ValueObject;

namespace Services.Dto;

public class RegisterDto
{
	public string Email { get; set; } = string.Empty;
	public string Password { get; set; } = string.Empty;
	public string FirstName { get; set; } = string.Empty;
	public string? MiddleName { get; set; } = string.Empty;
	public string LastName { get; set; } = string.Empty;
	public string? PhoneNumber { get; set; } = string.Empty;	
	public string? Country { get; set; } = string.Empty;
	public Gender Gender { get; set; } = Gender.Male;
	public string? IdentityId { get; set; }
	public string? ProfileImageLink { get; set; } 
	public DateOnly? BirthDate { get; set; }
	public string? Nationality { get; set; }
	public string? Occupation { get; set; }
	public string? SecondaryEmail { get; set; }

	public List<string> Roles { get; set; } = [ApplicationRoles.Customer];
}