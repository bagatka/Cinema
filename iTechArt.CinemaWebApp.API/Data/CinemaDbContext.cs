using iTechArt.CinemaWebApp.API.Model;

using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=Cinema;Trusted_Connection=True");
        }

        public CinemaDbContext(DbContextOptions<CinemaDbContext> options) : base(options)
        {
        }
    }
}
