using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Services.Entities;

namespace Services.Services.Token;

public class TokenServices
{
	private readonly IConfiguration _configuration;
	private readonly UserManager<ApplicationUser> _userManager;

	public TokenServices(IConfiguration configuration, UserManager<ApplicationUser> userManager)
	{
		_configuration = configuration;
		_userManager = userManager;
	}

	public string GenerateToken(ApplicationUser user, IList<string> roles)
	{
		var tokenHandler = new JwtSecurityTokenHandler();

		var key = Encoding.ASCII.GetBytes(_configuration.GetSection("JWTSetting").GetSection("securityKey").Value!);

		List<Claim> claims =
		[
			new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""), new Claim(JwtRegisteredClaimNames.Name, user.FullName ?? ""),
			new Claim(JwtRegisteredClaimNames.NameId, user.Id ?? ""),
			new Claim(JwtRegisteredClaimNames.Aud, _configuration.GetSection("JWTSetting").GetSection("validAudience").Value!),
			new Claim(JwtRegisteredClaimNames.Iss, _configuration.GetSection("JWTSetting").GetSection("validIssuer").Value!)
		];

		foreach (var role in roles) claims.Add(new Claim(ClaimTypes.Role, role));

		var tokenDescriptor = new SecurityTokenDescriptor
		{
			Subject = new ClaimsIdentity(claims),
			Expires = DateTime.UtcNow.AddDays(1),
			SigningCredentials = new SigningCredentials(
				new SymmetricSecurityKey(key),
				SecurityAlgorithms.HmacSha256
			)
		};

		var token = tokenHandler.CreateToken(tokenDescriptor);

		return tokenHandler.WriteToken(token);
	}
}