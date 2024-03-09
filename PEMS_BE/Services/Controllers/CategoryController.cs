using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Command;
using Services.Dto.Responses;
using Services.Queries;

namespace Services.Controllers;

[AllowAnonymous]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
	private readonly IMediator _mediator;

	public CategoryController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	public async Task<GetCategoriesPagingQueryResult> GetAll([FromQuery] GetCategoriesPagingQuery query)
	{
		var result = await _mediator.Send(query);
		return result;
	}

	[HttpGet("{id}")]
	public async Task<CategoryDto> Get(string id)
	{
		var result = await _mediator.Send(new GetCategoryQuery() { Id = id });
		return result;
	}

	[HttpPost]
	public async Task<CategoryDto> Add([FromBody] AddCategoryCommand request)
	{
		return await _mediator.Send(request);
	}

	[HttpPost("delete")]
	public async Task Delete([FromBody] DeleteCategoryCommand request)
	{
		await _mediator.Send(request);
	}

	[HttpPost("update")]
	public async Task Delete([FromBody] UpdateCategoryCommand request)
	{
		await _mediator.Send(request);
	}
}