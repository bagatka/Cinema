using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Cinema;
using iTechArt.CinemaWebApp.API.Application.DTOs.Hall;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Authorize(Policy = Policies.Admin)]
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

        [AllowAnonymous]
        [HttpGet(Name = "GetCinemas")]
        public async Task<IActionResult> GetCinemas([FromQuery] CinemaParameters cinemaParameters)
        {
            var cinemas = await _repository.Cinemas.GetCinemasAsync(cinemaParameters);

            var cinemasDto = _mapper.Map<IEnumerable<CinemaDto>>(cinemas);
                
            return Ok(cinemasDto);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetCinemaById")]
        public async Task<IActionResult> GetCinema(int id, [FromQuery] HallParameters hallParameters)
        {
            var cinema = await _repository.Cinemas.GetCinemaAsync(id);
            
            if (cinema == null)
            {
                return NotFound($"Cinema with id: {id} doesn't exist in the database.");
            }

            var cinemaDto = _mapper.Map<CinemaFullDto>(cinema);
            
            return Ok(cinemaDto);
        }
        
        [AllowAnonymous]
        [HttpGet("{id}/halls", Name = "GetHallsByCinemaId")]
        public async Task<IActionResult> GetHalls(int id, [FromQuery] HallParameters hallParameters)
        {
            var cinema = await _repository.Cinemas.GetCinemaAsync(id);
            
            if (cinema == null)
            {
                return NotFound($"Cinema with id: {id} doesn't exist in the database.");
            }

            if (!string.IsNullOrEmpty(hallParameters.CinemaName) && !string.Equals(cinema.Name, hallParameters.CinemaName))
            {
                return BadRequest("Incorrect cinema name or cinema id.");
            }

            hallParameters.CinemaId = id;

            var halls = await _repository.Halls.GetHallsAsync(hallParameters);

            var hallsDto = _mapper.Map<IEnumerable<HallDto>>(halls);

            return Ok(hallsDto);
        }
        
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateCinema([FromBody] CinemaForManipulationDto cinema)
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
        public async Task<IActionResult> UpdateCinema(int id, [FromBody] CinemaForManipulationDto cinema)
        {
            var cinemaEntity = HttpContext.Items["entity"] as Cinema;

            _mapper.Map(cinema, cinemaEntity);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}