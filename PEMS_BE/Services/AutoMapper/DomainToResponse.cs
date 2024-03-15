using AutoMapper;
using Services.Dto.Responses;
using Services.Entities;

namespace Services.AutoMapper;

public class DomainToResponse : Profile
{
	public DomainToResponse()
	{
		CreateMap<Category, CategoryDto>()
			.ForMember(dest => dest.ChildCategories,
				opt =>
				{
					opt.PreCondition(src => src.ChildCategories != null);
					opt.MapFrom(src => src.ChildCategories!.Select(p => new CategoryDto(p)));
				})
			.ForMember(dest => dest.ParentCategory,
				opt =>
				{
					opt.PreCondition(src => src.ParentCategory != null);
					opt.MapFrom(src => src.ParentCategory);
				})
			;
		//CreateMap<List<Category>, List<CategoryDto>>();
	}
}