using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Cinema;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemasController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly IDataShaper<CinemaDto> _shaperCinemaDto;

        public CinemasController(IRepositoryManager repository, IMapper mapper, IDataShaper<CinemaDto> shaperCinemaDto)
        {
            _repository = repository;
            _mapper = mapper;
            _shaperCinemaDto = shaperCinemaDto;
        }

        [HttpGet(Name = "GetCinemas")]
        public async Task<IActionResult> GetCinemas([FromQuery] CinemaParameters cinemaParameters)
        {
            var cinemas = await _repository.Cinemas.GetAllCinemasAsync(cinemaParameters, trackChanges: false);

            var cinemasDto = _mapper.Map<IEnumerable<CinemaDto>>(cinemas);
                
            return Ok(_shaperCinemaDto.ShapeData(cinemasDto, cinemaParameters.Fields));
        }

        [HttpGet("{id}", Name = "GetCinemaById")]
        public async Task<IActionResult> GetCinema(int id)
        {
            var cinema = await _repository.Cinemas.GetCinemaAsync(id, trackChanges: false);
            
            if (cinema == null)
            {
                return NotFound($"Cinema with id: {id} doesn't exist in the database.");
            }

            var cinemaDto = _mapper.Map<CinemaDto>(cinema);
            
            return Ok(cinemaDto);
        }
        
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateCinema([FromBody] CinemaForCreationDto cinema)
        {
            var cinemaEntity = _mapper.Map<Cinema>(cinema);

            await _repository.Cinemas.CreateCinemaAsync(cinemaEntity);
            await _repository.SaveAsync();

            var cinemaToReturn = _mapper.Map<CinemaDto>(cinemaEntity);

            return CreatedAtRoute("GetCinemaById", new { id = cinemaToReturn.Id }, cinemaToReturn);
        }

        [HttpDelete("{id}")]
        [ServiceFilter(typeof(ValidateCinemaExistsAttribute))]
        public async Task<ActionResult> DeleteCinema(int id)
        {
            var cinema = HttpContext.Items["entity"] as Cinema;

            _repository.Cinemas.DeleteCinema(cinema);
            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [ServiceFilter(typeof(ValidateCinemaExistsAttribute))]
        public async Task<IActionResult> UpdateCinema(int id, [FromBody] CinemaForUpdateDto cinema)
        {
            var cinemaEntity = HttpContext.Items["entity"] as Cinema;

            _mapper.Map(cinema, cinemaEntity);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}