using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Services.Data;
using Services.Entities;

namespace Services.Command;

public class DeleteCategoryCommand : IRequest<Unit>
{
	public string Id { get; set; } = string.Empty;
}

public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Unit>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;

	public DeleteCategoryCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
	}

	public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
	{
		var toDeleteCategory = await _unitOfWork.Categories.GetAsync(query => query.Where(x => x.Id == request.Id));

		if (toDeleteCategory == null) throw new Exception("Not found id for category");
		if (toDeleteCategory.IsRootCategory) throw new Exception("Can not remove root category");

		await _unitOfWork.Categories.RemoveAsync(toDeleteCategory);

		await _unitOfWork.CompleteAsync();

		return Unit.Value;
	}
}