using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Models;

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
        public async Task<ActionResult<IEnumerable<Film>>> GetFilmsByFilter([FromQuery] Filter filter)
        {
            var films = _context.Films
                .AsNoTracking()
                .AsQueryable();

            if (filter == null) return BadRequest();

            if (!string.IsNullOrEmpty(filter.FilmTitle))
                films = films.Where(film => film.Title.Contains(filter.FilmTitle));

            return await films.OrderBy(film => film.Id).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Film>> GetFilmById(int id)
        {
            var result = await _context.Films.FindAsync(id);

            if (result == null) return NotFound();

            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Film>> CreateFilm(Film film)
        {
            if (film == null || !ModelState.IsValid) return BadRequest();

            var newFilm = new Film
            {
                Title = film.Title,
                Description = film.Description,
                PosterUrl = !string.IsNullOrEmpty(film.PosterUrl) ? film.PosterUrl : "",
                BannerUrl = !string.IsNullOrEmpty(film.BannerUrl) ? film.BannerUrl : ""
            };
            await _context.Films.AddAsync(newFilm);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFilmById), new {id = newFilm.Id}, newFilm);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFilm(int id, [FromBody] Film film)
        {
            if (id != film?.Id || !ModelState.IsValid) return BadRequest();

            _context.Entry(film).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilmExists(id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Film>> DeleteFilm(int id)
        {
            var resultFilm = await _context.Films.FindAsync(id);

            if (resultFilm == null) return NotFound();
            _context.Films.Remove(resultFilm);
            await _context.SaveChangesAsync();

            return resultFilm;
        }

        private bool FilmExists(int id)
        {
            return _context.Films.Any(film => film.Id == id);
        }
    }
}