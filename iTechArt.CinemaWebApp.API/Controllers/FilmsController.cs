using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Model;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        public FilmsController(CinemaDbContext cinemaDbContext)
        {
            _context = cinemaDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilmByName([FromQuery] string name)
        {
            var films = _context.Films.AsQueryable();

            if(!string.IsNullOrEmpty(name))
            {
                films = films.Where(n => n.Title.Contains(name));
            }

            return await films.OrderBy(num => num.Id).ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Film>> CreateHero(Film film)
        {
            Film newFilm = new Film()
            {
                Title = film.Title
            };
            await _context.Films.AddAsync(newFilm);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
