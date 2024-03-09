using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Constants;
using Services.Dto;
using Services.Entities;
using Services.Services.Token;

namespace Services.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
	private readonly IConfiguration _configuration;
	private readonly IMapper _mapper;
	private readonly RoleManager<IdentityRole> _roleManager;
	private readonly TokenServices _tokenServices;
	private readonly UserManager<ApplicationUser> _userManager;

	public AccountController(
		UserManager<ApplicationUser> userManager,
		RoleManager<IdentityRole> roleManager,
		IConfiguration configuration,
		IMapper mapper,
		TokenServices tokenServices)
	{
		_userManager = userManager;
		_roleManager = roleManager;
		_configuration = configuration;
		_mapper = mapper;
		_tokenServices = tokenServices;
	}

	[AllowAnonymous]
	[HttpPost("register")]
	public async Task<ActionResult<string>> Register([FromBody] RegisterDto registerDto)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);

		var user = _mapper.Map<ApplicationUser>(registerDto);

		var result = await _userManager.CreateAsync(user, registerDto.Password);

		if (!result.Succeeded) return BadRequest(result.Errors);

		if (registerDto.Roles is null)
			await _userManager.AddToRoleAsync(user, ApplicationRoles.User);
		else
			foreach (var role in registerDto.Roles)
				await _userManager.AddToRoleAsync(user, role);

		return Ok(new AuthResponseDto
		{
			IsSuccess = true,
			Message = "Account Created Sucessfully!"
		});
	}

	[AllowAnonymous]
	[HttpPost("login")]
	public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);

		var user = await _userManager.FindByEmailAsync(loginDto.Email);

		if (user is null)
			return Unauthorized(new AuthResponseDto
			{
				IsSuccess = false,
				Message = "User not found with this email"
			});

		var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

		if (!result)
			return Unauthorized(new AuthResponseDto
			{
				IsSuccess = false,
				Message = "Invalid Password."
			});

		var roles = await _userManager.GetRolesAsync(user);
		var token = _tokenServices.GenerateToken(user, roles);

		return Ok(new AuthResponseDto
		{
			Token = token,
			IsSuccess = true,
			Message = "Login Success."
		});
	}

	[HttpGet("detail")]
	public async Task<ActionResult<UserDetailDto>> GetUserDetail()
	{
		var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
		var user = await _userManager.FindByIdAsync(currentUserId!);

		if (user is null)
			return NotFound(new AuthResponseDto
			{
				IsSuccess = false,
				Message = "User not found"
			});

		var userDetail = _mapper.Map<UserDetailDto>(user);

		return Ok(userDetail);
	}
}