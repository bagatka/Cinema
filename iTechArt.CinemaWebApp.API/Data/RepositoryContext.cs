using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class RepositoryContext: DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Show> Shows { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<HallService> HallServices { get; set; }
        public DbSet<SeatsSchema> SeatsSchemas { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderAddon> OrderAddons { get; set; }
        
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {
        }
    }
}
