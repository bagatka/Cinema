using System;
using System.Text;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.DataShaping;
using iTechArt.CinemaWebApp.API.Application.DTOs.Cinema;
using iTechArt.CinemaWebApp.API.Application.DTOs.Film;
using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services, IConfiguration configuration, string allowedSpecificOrigins)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(allowedSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins(configuration.GetSection("AllowedOrigins").Get<string[]>())
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
        }

        public static void ConfigureJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.Unicode.GetBytes(configuration["Jwt:SecretKey"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });
        }

        public static void ConfigureAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(config =>
            {
                config.AddPolicy(Policies.Admin, Policies.AdminPolicy());
                config.AddPolicy(Policies.User, Policies.UserPolicy());
            });
        }

        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<RepositoryContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("CinemaWebAppDatabase")));
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureValidateAttributes(this IServiceCollection services)
        {
            services.AddScoped<ValidationFilterAttribute>();
            services.AddScoped<ValidateFilmExistsAttribute>();
            services.AddScoped<ValidateCinemaExistsAttribute>();
            services.AddScoped<ValidateShowExistsAttribute>();
            services.AddScoped<ValidateServiceExistsAttribute>();
        }

        public static void ConfigureDataShapers(this IServiceCollection services)
        {
            services.AddScoped<IDataShaper<FilmDto>, DataShaper<FilmDto>>();
            services.AddScoped<IDataShaper<CinemaDto>, DataShaper<CinemaDto>>();
        }
    }
}