using MediatR;
using Services.Data;
using Services.Dto.Responses;

namespace Services.Command;

public class DeleteProductCommand : IRequest<ProductDto>
{
	public required string Id { get; set; }
}

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, ProductDto>
{
	private readonly IUnitOfWork _unitOfWork;

	public DeleteProductCommandHandler(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	public async Task<ProductDto> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
	{
		var existedProduct = await _unitOfWork.Products.GetAsync(x => x.Id == request.Id);
		if (existedProduct == null) throw new Exception("Not found product");

		await _unitOfWork.Products.RemoveAsync(existedProduct);
		await _unitOfWork.CompleteAsync();

		return new ProductDto(existedProduct);
	}
}