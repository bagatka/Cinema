using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Model;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemasController : ControllerBase
    {
        private readonly CinemaDbContext _context;

        public CinemasController(CinemaDbContext cinemaDbContext)
        {
            _context = cinemaDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cinema>>> GetCinemas()
        {
            return await _context.Cinemas.AsNoTracking().OrderBy(cinema => cinema.Id).ToListAsync();
        }

        [HttpGet("cities")]
        public async Task<ActionResult<IEnumerable<string>>> GetCinemasCities()
        {
            return await _context.Cinemas.AsNoTracking().Select(cinema => cinema.City).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cinema>>> GetCinemasByCity([FromQuery] string city)
        {
            var cinemas = _context.Cinemas.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(city))
            {
                cinemas = cinemas.Where(c => c.City == city);
            }

            return await cinemas.OrderBy(film => film.Id).ToListAsync();
        }
    }
}
