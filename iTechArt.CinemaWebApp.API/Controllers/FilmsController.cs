using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.DTOs.Film;
using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        private readonly IMapper _mapper;
        
        public FilmsController(CinemaDbContext cinemaDbContext, IMapper mapper)
        {
            _context = cinemaDbContext;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FilmDTO>> GetFilmById(int id)
        {
            var film = await _context.Films.FindAsync(id);

            if (film == null)
            {
                return NotFound($"No film found with id: {id}.");
            }

            return _mapper.Map<FilmDTO>(film);
        }

        [HttpGet]
        public async Task<ActionResult<List<FilmCarouselDTO>>> GetFilmsWithBanners()
        {
            return await _context.Films
                .AsNoTracking()
                .Where(film => !string.IsNullOrEmpty(film.BannerUrl))
                .Select(film => _mapper.Map<FilmCarouselDTO>(film))
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FilmDTO>> CreateFilm(FilmDTO filmDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Incorrect request body.");
            }

            var film = _mapper.Map<Film>(filmDto);
            
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetFilmById),
                new { id = film.Id },
                _mapper.Map<FilmDTO>(film));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFilm(int id, [FromBody] FilmDTO filmDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Incorrect request body.");
            }

            if (!FilmExists(id))
            {
                return NotFound($"No film found with id: {id}.");
            }
            
            var updatedFilm = _mapper.Map<Film>(filmDto);
            updatedFilm.Id = id;
            
            _context.Entry(updatedFilm).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilmExists(id))
                {
                    return NotFound($"No film found with id: {id}.");
                }
                throw;
            }

            return Ok($"Film with id: {id} was successfully updated.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFilm(int id)
        {
            var film = await _context.Films.FindAsync(id);

            if (film == null)
            {
                return NotFound($"No film found with id: {id}.");
            }
            
            _context.Films.Remove(film);
            await _context.SaveChangesAsync();

            return Ok($"Film with id: {id} was successfully deleted.");
        }

        private bool FilmExists(int id) =>
            _context.Films.Any(film => film.Id == id);
    }
}