using AutoMapper;
using Services.Dto;
using Services.Entities;

namespace Services.AutoMapper;

public class UserProfile : Profile
{
	public UserProfile()
	{
		CreateMap<RegisterDto, ApplicationUser>()
			.ForMember(dest => dest.FullName,
				src => src.MapFrom(x => $"{x.FirstName} {x.MiddleName} {x.LastName}"))
			.ForMember(dest => dest.UserName,
				src => src.MapFrom(x => x.Email));
		CreateMap<ApplicationUser, UserDetailDto>();
	}
}