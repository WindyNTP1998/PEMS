using AutoMapper;
using FluentValidation;
using MediatR;
using Services.Data;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;

namespace Services.Queries;

public class GetCategoryQuery : IRequest<CategoryDto>
{
	public string Id { get; set; } = string.Empty;
}

public sealed class GetCategoryQueryValidator : AbstractValidator<GetCategoryQuery>
{
	public GetCategoryQueryValidator()
	{
		RuleFor(c => c.Id).Must(x => !x.IsNullOrEmpty()).WithMessage("Category Id must nor null or empty");
	}
}

public class GetCategoryQueryHandler : IRequestHandler<GetCategoryQuery, CategoryDto>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;
	private readonly IValidator<GetCategoryQuery> _validator;

	public GetCategoryQueryHandler(IUnitOfWork unitOfWork, IMapper mapper, IValidator<GetCategoryQuery> validator)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
		_validator = validator;
	}

	public async Task<CategoryDto> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
	{
		if (request.Id.IsNullOrEmpty())
			return new CategoryDto();

		var category = await _unitOfWork.Categories.GetByIdAsync(request.Id);

		await _unitOfWork.CompleteAsync();
		return category != null ? _mapper.Map<Category, CategoryDto>(category) : new CategoryDto();
	}
}