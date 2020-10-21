using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.Extensions;
using iTechArt.CinemaWebApp.API.Application.Services;

namespace iTechArt.CinemaWebApp.API
{
    public class Startup
    {
        private readonly string AllowedSpecificOrigins = "_AllowedSpecificOrigins";
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCorsPolicy(Configuration, AllowedSpecificOrigins);

            services.AddJwtAuthentication(Configuration);

            services.AddValidateAttributes();
            
            services.AddAutoMapper(typeof(Startup));

            services.AddDataShapers();
            
            services.AddTransient<AccountService>();
            
            services.AddRepositoryManager();

            services.Configure<ApiBehaviorOptions>(options =>
                {
                    options.SuppressModelStateInvalidFilter = true;
                }
            );
            
            services.AddAuthorizationPolicy();

            services.AddControllers();

            services.AddSqlContext(Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseGlobalExceptionHandler();
            
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(AllowedSpecificOrigins);

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                }
            );
        }
    }
}
