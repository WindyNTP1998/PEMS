using AutoMapper;
using MediatR;
using Services.Data;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;

namespace Services.Command;

public class UpdateCategoryCommand : IRequest<CategoryDto>
{
	public CategoryDto UpdatedCategory { get; set; }
}

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, CategoryDto>
{
	private readonly IUnitOfWork _unitOfWork;

	public UpdateCategoryCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
	}

	public async Task<CategoryDto> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
	{
		var toUpdateCategory = request.UpdatedCategory.Id != null
			? await _unitOfWork.Categories.GetByIdAsync(request.UpdatedCategory.Id)
			: null;

		if (toUpdateCategory == null) throw new Exception("Not found id for category");

		var updateCategory = toUpdateCategory
			.With(p => p.Name = request.UpdatedCategory.Name)
			.With(p => p.ParentId = request.UpdatedCategory.ParentId)
			.With(p => p.Slug = p.ReplaceLastSlugPart(request.UpdatedCategory.Slug))
			.With(p => p.Level = request.UpdatedCategory.Level);

		await _unitOfWork.Categories.Update(updateCategory);

		await _unitOfWork.CompleteAsync();

		return request.UpdatedCategory;
	}
}