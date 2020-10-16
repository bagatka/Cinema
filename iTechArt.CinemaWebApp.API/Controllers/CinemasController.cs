using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Models;
using iTechArt.CinemaWebApp.API.Application.DTOs;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemasController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public CinemasController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<Cinema>>> GetCinemas()
        {
            return await _context.Cinemas
                .AsNoTracking()
                .OrderBy(cinema => cinema.Name)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CinemaDTO>> GetCinemaById(int id)
        {
            var cinema = await _context.Cinemas.FindAsync(id);

            if (cinema == null)
            {
                return NotFound($"No cinema found with id: {id}.");
            }

            return _mapper.Map<CinemaDTO>(cinema);
        }

        [HttpGet("cities")]
        public async Task<ActionResult<IEnumerable<string>>> GetCinemasCities()
        {
            return await _context.Cinemas
                .AsNoTracking()
                .Select(cinema => cinema.City)
                .OrderBy(city => city)
                .ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cinema>>> GetCinemasByCity([FromQuery] string city)
        {
            var cinemas = _context.Cinemas
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrEmpty(city))
            {
                cinemas = cinemas.Where(cinema => String.Equals(cinema.City, city));
            }

            return await cinemas.OrderBy(cinema => cinema.Name).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<CinemaDTO>> CreateCinema([FromBody] CinemaDTO cinemaDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Incorrect request body.");
            }
            
            var cinema = _mapper.Map<Cinema>(cinemaDto);

            await _context.Cinemas.AddAsync(cinema);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetCinemaById),
                new { id = cinema.Id },
                _mapper.Map<CinemaDTO>(cinema));
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] CinemaDTO cinemaDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Incorrect request body.");
            }

            if (!CinemaExists(id))
            {
                return NotFound($"No cinema found with id: {id}.");
            }

            var updatedCinema = _mapper.Map<Cinema>(cinemaDto);
            updatedCinema.Id = id;
            
            _context.Entry(updatedCinema).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CinemaExists(id))
                {
                    return NotFound($"No cinema found with id: {id}.");
                }
                throw;
            }

            return Ok($"Cinema with id: {id} was successfully updated.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCinema(int id)
        {
            var cinema = await _context.Cinemas.FindAsync(id);

            if (cinema == null)
            {
                return NotFound($"No cinema found with id: {id}.");
            }

            _context.Cinemas.Remove(cinema);
            await _context.SaveChangesAsync();

            return Ok($"Cinema with id: {id} was successfully deleted.");
        }

        private bool CinemaExists(int id) =>
            _context.Cinemas.Any(cinema => cinema.Id == id);*/
    }
}