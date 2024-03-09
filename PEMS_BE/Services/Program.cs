using System.Reflection;
using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Services.Data;
using Services.Entities;
using Services.ServicesRegister;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services
	.AddIdentity<ApplicationUser, IdentityRole>()
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddDefaultTokenProviders();

var jwtSetting = builder.Configuration.GetSection("JWTSetting");
builder.Services
	.AddAuthentication(opt =>
	{
		opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
	})
	.AddJwtBearer(opt =>
	{
		opt.SaveToken = true;
		opt.RequireHttpsMetadata = false;
		opt.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidAudience = jwtSetting["ValidAudience"],
			ValidIssuer = jwtSetting["ValidIssuer"],
			IssuerSigningKey =
				new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSetting.GetSection("securityKey").Value!))
		};
	});

builder.Services.AddSwaggerGen(c =>
{
	c.AddSecurityDefinition("Bearer",
		new OpenApiSecurityScheme
		{
			Description = @"JWT Authorization Example : 'Bearer eyeleieieekeieieie",
			Name = "Authorization",
			In = ParameterLocation.Header,
			Type = SecuritySchemeType.ApiKey,
			Scheme = "Bearer"
		});

	c.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				},
				Scheme = "outh2",
				Name = "Bearer",
				In = ParameterLocation.Header
			},
			new List<string>()
		}
	});
});
builder.Services.RepositoryDependenceInjectionRegister();
builder.Services.AddMediatR(cfg =>
{
	cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
	cfg.RegisterServicesFromAssemblyContaining<Program>();
	cfg.Lifetime = ServiceLifetime.Scoped;
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigins",
		builder =>
		{
			builder.WithOrigins("http://localhost:3239", "http://localhost:3240")
				.AllowAnyHeader()
				.AllowAnyMethod();
		});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

//app.MapIdentityApi<IdentityUser>().WithName("Phong"); //Default Auth
app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowSpecificOrigins");

await app.SeedDataAsync();

app.Run();