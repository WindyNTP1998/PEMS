using MediatR;
using Services.Data;
using Services.Dto.Responses;
using Services.Extensions;

namespace Services.Command;

public class ChangePublishStatusProductCommand : IRequest<ProductDto>
{
	public required string Id { get; set; }
	public required bool IsPublish { get; set; } = true;
}

public class ChangePublishStatusProductCommandHandler : IRequestHandler<ChangePublishStatusProductCommand, ProductDto>
{
	private readonly IUnitOfWork _unitOfWork;

	public ChangePublishStatusProductCommandHandler(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	public async Task<ProductDto> Handle(ChangePublishStatusProductCommand request, CancellationToken cancellationToken)
	{
		var toChangePublishStatusProduct = await _unitOfWork.Products.GetAsync(x => x.Id == request.Id);
		if (toChangePublishStatusProduct == null) throw new Exception("Not found product");

		await _unitOfWork.Products.UpdateAsync(toChangePublishStatusProduct.With(x => x.IsPublish = request.IsPublish));
		await _unitOfWork.CompleteAsync();

		return new ProductDto(toChangePublishStatusProduct);
	}
}