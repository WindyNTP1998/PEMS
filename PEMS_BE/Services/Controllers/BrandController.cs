using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Data.Repository;

namespace Services.Controllers;

[AllowAnonymous]
[Route("[controller]")]
public class BrandController : Controller
{
    private readonly IBrandRepository _brandRepository;

    public BrandController(IBrandRepository brandRepository)
    {
        _brandRepository = brandRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] string id)
    {
        var a = await _brandRepository.GetAllWithQueryAsync(query => query.Where(p => p.Name == "PhongCate"));

        return Ok(a);
    }
}