using AutoMapper;
using MediatR;
using Services.Data;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;

namespace Services.Command;

public class AddCategoryCommand : IRequest<CategoryDto>
{
	public string Name { get; set; } = string.Empty;
	public string? ParentId { get; set; }
	public string Slug { get; set; } = string.Empty;
	public string CategoryImageUrl { get; set; } = string.Empty;
}

public class AddCategoryCommandHandler : IRequestHandler<AddCategoryCommand, CategoryDto>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;

	public AddCategoryCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
	}

	public async Task<CategoryDto> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
	{
		var parentCategory = request.ParentId.IsNotNullOrEmpty()
			? await _unitOfWork.Categories.GetByIdAsync(request.ParentId)
			: null;

		var toCreateCategory = new Category()
		{
			CategoryImageUrl = request.CategoryImageUrl,
			Name = request.Name,
			IsActive = true,
			Slug = parentCategory == null ? request.Slug : $"{parentCategory.Slug}/{request.Slug}",
			ParentId = request.ParentId,
			Level = parentCategory == null ? 1 : parentCategory.Level + 1,
			CreatedBy = "System",
			CreatedDate = DateTime.UtcNow,
			LastUpdatedDate = DateTime.UtcNow,
			LastUpdatedBy = "System"
		};

		var createdCategory = await _unitOfWork.Categories.Insert(toCreateCategory);

		await _unitOfWork.CompleteAsync();

		return new CategoryDto(createdCategory);
	}
}