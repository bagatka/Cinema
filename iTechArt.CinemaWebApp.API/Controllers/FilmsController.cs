using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Film;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Authorize(Policy = Policies.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        
        public FilmsController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet(Name = "GetFilms")]
        public async Task<IActionResult> GetFilms([FromQuery] FilmParameters filmParameters)
        {
            var films = await _repository.Films.GetFilmsAsync(filmParameters);

            var filmsDto = _mapper.Map<IEnumerable<FilmDto>>(films);
                
            return Ok(filmsDto);
        }

        [AllowAnonymous]
        [HttpGet("{id:int}", Name = "GetFilmById")]
        public async Task<IActionResult> GetFilm(int id)
        {
            var film = await _repository.Films.GetFilmAsync(id);
            
            if (film == null)
            {
                return NotFound($"Film with id: {id} doesn't exist in the database.");
            }

            var filmDto = _mapper.Map<FilmDto>(film);
            
            return Ok(filmDto);
        }
        
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateFilm([FromBody] FilmForManipulationDto film)
        {
            var filmEntity = _mapper.Map<Film>(film);

            await _repository.Films.CreateFilmAsync(filmEntity);
            await _repository.SaveAsync();

            var filmToReturn = _mapper.Map<FilmDto>(filmEntity);

            return CreatedAtRoute("GetFilmById", new { id = filmToReturn.Id }, filmToReturn);
        }
        
        [HttpDelete("{id:int}")]
        [ServiceFilter(typeof(ValidateFilmExistsAttribute))]
        public async Task<ActionResult> DeleteFilm(int id)
        {
            var film = HttpContext.Items["entity"] as Film;

            _repository.Films.DeleteFilm(film);
            await _repository.SaveAsync();

            return NoContent();
        }
        
        [HttpPut("{id:int}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [ServiceFilter(typeof(ValidateFilmExistsAttribute))]
        public async Task<IActionResult> UpdateFilm(int id, [FromBody] FilmForManipulationDto film)
        {
            var filmEntity = HttpContext.Items["entity"] as Film;

            _mapper.Map(film, filmEntity);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}