using Microsoft.AspNetCore.Identity;
using Services.Entities.ValueObject;

namespace Services.Entities;

public class ApplicationUser : IdentityUser
{
    //Basic Info
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; } = "";
    public string IdentityId { get; set; } = "";
    public string? ProfileImageLink { get; set; }
    public DateOnly BirthDate { get; set; }
    public string? Nationality { get; set; }
    public string? Occupation { get; set; }
    public Gender Gender { get; set; } = Gender.Male;
    public string? SecondaryEmail { get; set; }


    public bool IsActive { get; set; }
    public bool IsConfirmed { get; set; }
    public DateTime LastLoginDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? LastUpdatedDate { get; set; }
    public string? LastUpdatedBy { get; set; }
}