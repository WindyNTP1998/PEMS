using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Data.Repository;

namespace Services.Controllers;

[AllowAnonymous]
[Route("[controller]")]
public class BrandController : ControllerBase
{
}