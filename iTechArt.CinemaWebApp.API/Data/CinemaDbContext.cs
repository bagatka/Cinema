using iTechArt.CinemaWebApp.API.Model;

using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class CinemaDbContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Show> Shows { get; set; }
        public CinemaDbContext(DbContextOptions<CinemaDbContext> options) : base(options)
        {
        }
    }
}
