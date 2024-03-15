using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Command;
using Services.Dto.Responses;
using Services.Queries;

namespace Services.Controllers;

[AllowAnonymous]
[Route("api/[controller]")]
public class ProductController : Controller
{
	private readonly IMediator _mediator;

	public ProductController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	public Task<ProductDto> Get([FromQuery] GetProductQuery request)
	{
		return _mediator.Send(request);
	}

	[HttpGet("list")]
	public Task<GetProductPagingQueryResult> GetAll([FromQuery] GetProductPagingQuery request)
	{
		return _mediator.Send(request);
	}

	[HttpPost]
	public Task<ProductDto> Create([FromBody] CreateProductCommand request)
	{
		return _mediator.Send(request);
	}

	[HttpPost("update")]
	public Task<ProductDto> Update([FromBody] UpdateProductCommand request)
	{
		return _mediator.Send(request);
	}

	[HttpPost("delete")]
	public Task<ProductDto> Delete([FromBody] DeleteProductCommand request)
	{
		return _mediator.Send(request);
	}

	[HttpPost("change-status")]
	public Task<ProductDto> ChangePublishStatus([FromBody] ChangePublishStatusProductCommand request)
	{
		return _mediator.Send(request);
	}
}