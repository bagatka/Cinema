using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Film;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly IDataShaper<FilmDto> _shaperFilmDto;
        
        public FilmsController(IRepositoryManager repository, IMapper mapper, IDataShaper<FilmDto> shaperFilmDto)
        {
            _repository = repository;
            _mapper = mapper;
            _shaperFilmDto = shaperFilmDto;
        }

        [HttpGet(Name = "GetFilms")]
        public async Task<IActionResult> GetFilms([FromQuery] FilmParameters filmParameters)
        {
            var films = await _repository.Films.GetAllFilmsAsync(filmParameters, trackChanges: false);

            var filmsDto = _mapper.Map<IEnumerable<FilmDto>>(films);
                
            return Ok(_shaperFilmDto.ShapeData(filmsDto, filmParameters.Fields));
        }

        [HttpGet("{id}", Name = "FilmById")]
        public async Task<IActionResult> GetFilm(int id)
        {
            var film = await _repository.Films.GetFilmAsync(id, trackChanges: false);
            
            if (film == null)
            {
                return NotFound($"Film with id: {id} doesn't exist in the database.");
            }

            var filmDto = _mapper.Map<FilmDto>(film);
            
            return Ok(filmDto);
        }
        
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateFilm([FromBody] FilmForCreationDto film)
        {
            var filmEntity = _mapper.Map<Film>(film);

            await _repository.Films.CreateFilm(filmEntity);
            await _repository.SaveAsync();

            var filmToReturn = _mapper.Map<FilmDto>(filmEntity);

            return CreatedAtRoute("FilmById", new { id = filmToReturn.Id }, filmToReturn);
        }

        [HttpDelete("{id}")]
        [ServiceFilter(typeof(ValidateFilmExistsAttribute))]
        public async Task<ActionResult> DeleteFilm(int id)
        {
            var film = HttpContext.Items["film"] as Film;

            _repository.Films.DeleteFilm(film);
            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [ServiceFilter(typeof(ValidateFilmExistsAttribute))]
        public async Task<IActionResult> UpdateFilm(int id, [FromBody] FilmForUpdateDto film)
        {
            var filmEntity = HttpContext.Items["film"] as Film;

            _mapper.Map(film, filmEntity);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}