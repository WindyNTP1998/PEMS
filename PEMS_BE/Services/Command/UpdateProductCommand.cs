using FluentValidation;
using MediatR;
using Services.Data;
using Services.Dto;
using Services.Dto.Responses;
using Services.Extensions;

namespace Services.Command;

public class UpdateProductCommand : IRequest<ProductDto>
{
	public required ProductDto ToUpdateProduct { get; set; }
}

public sealed class UpdateProductCommandValidate : AbstractValidator<UpdateProductCommand>
{
	public UpdateProductCommandValidate()
	{
		RuleFor(c => c.ToUpdateProduct).NotNull();
	}
}

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, ProductDto>
{
	private readonly IUnitOfWork _unitOfWork;

	public UpdateProductCommandHandler(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	public async Task<ProductDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
	{
		var existedProduct = await _unitOfWork.Products.GetAsync(query => query.Where(x => x.Id == request.ToUpdateProduct.Id));
		if (existedProduct == null) throw new Exception("Not found product");

		var toUpdateProduct = request.ToUpdateProduct
			.UpdateToEntity(existedProduct)
			.With(p => p.LastUpdatedDate = DateTime.UtcNow);

		await _unitOfWork.Products.UpdateAsync(toUpdateProduct);
		await _unitOfWork.CompleteAsync();

		return new ProductDto(toUpdateProduct);
	}
}