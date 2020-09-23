using iTechArt.CinemaWebApp.API.Data;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
            services.AddCors(options =>
            {
                options.AddPolicy(AllowedSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins(Configuration.GetSection("AllowedOrigins").Get<string[]>())
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.AddControllers();

            services.AddDbContext<CinemaDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("CinemaWebAppDatabase")));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(AllowedSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
