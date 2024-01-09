using System.ComponentModel.DataAnnotations;

namespace Services.Dto;

public class RegisterDto
{
    [Required] public string Email { get; set; } = string.Empty;

    [Required] public string Password { get; set; } = string.Empty;

    [Required] public string FirstName { get; set; } = string.Empty;

    [Required] public string LastName { get; set; } = string.Empty;

    [Required] public string PhoneNumber { get; set; } = string.Empty;

    [Required] public string Country { get; set; } = string.Empty;
}