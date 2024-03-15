using FluentValidation;
using MediatR;
using Services.Data;
using Services.Data.Repository;
using Services.Dto.Responses;
using Services.Entities;
using Services.Extensions;

namespace Services.Command;

public class CreateProductCommand : IRequest<ProductDto>
{
	public required ProductDto Product { get; set; }
	public required string CategoryId { get; set; }
}

public sealed class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
	public CreateProductCommandValidator()
	{
		RuleFor(c => c.Product.Slug).Must(x => !x.IsNullOrEmpty()).WithMessage("Category Id must nor null or empty");
	}
}

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IProductRepository _productRepository;
	private readonly ICategoryRepository _categoryRepository;

	public CreateProductCommandHandler(IUnitOfWork unitOfWork, IProductRepository productRepository, ICategoryRepository categoryRepository)
	{
		_unitOfWork = unitOfWork;
		_productRepository = productRepository;
		_categoryRepository = categoryRepository;
	}

	public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
	{
		var isExistProduct = await _unitOfWork.Products
			.GetAllAsync(query => query.Where(x => x.Slug == request.Product.Slug ||
			                                       x.Name == request.Product.Name ||
			                                       x.Code == request.Product.Code));
		if (isExistProduct.Any()) throw new Exception("Product is exist");

		var category = await _unitOfWork.Categories.GetAsync(query => query.Where(x => x.Id == request.CategoryId));
		if (category == null) throw new Exception("Not found category");

		var rootSlugs = category.Slug.Split("/");
		var rootCategories = await _unitOfWork.Categories
			.GetAllAsync(query => query.Where(x => rootSlugs.Contains(x.Slug)).OrderBy(x => x.Level));

		var toCreateProduct = request.Product
			.MapToNewEntity()
			.With(p => p.Slug = $"{category?.Slug}/{request.Product.Slug}")
			.With(p => p.ProductCategories = rootCategories
				.Select(cate => new ProductCategory()
				{
					CategoryId = cate.Id,
					ProductId = p.Id
				})
				.ToList());

		await _unitOfWork.Products.CreateAsync(toCreateProduct);

		await _unitOfWork.CompleteAsync();

		return new ProductDto();
	}
}