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
			? await _unitOfWork.Categories.GetAsync(query => query.Where(x => x.Id == request.UpdatedCategory.Id))
			: null;

		if (toUpdateCategory == null) throw new Exception("Not found id for category");

		var updateCategory = request.UpdatedCategory
			.UpdateToEntity(toUpdateCategory)
			.With(c => c.LastUpdatedDate = DateTime.UtcNow);

		await _unitOfWork.Categories.UpdateAsync(updateCategory);

		await _unitOfWork.CompleteAsync();

		return new CategoryDto(updateCategory);
	}
}