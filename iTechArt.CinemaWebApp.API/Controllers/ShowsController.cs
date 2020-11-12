using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.SeatPosition;
using iTechArt.CinemaWebApp.API.Application.DTOs.Show;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Authorize(Policy = Policies.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : Controller
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public ShowsController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet(Name = "GetShows")]
        public async Task<IActionResult> GetShows([FromQuery] ShowParameters showParameters)
        {
            var shows = await _repository.Shows.GetShowsAsync(showParameters);

            var showsDto = _mapper.Map<IEnumerable<ShowDto>>(shows);
                
            return Ok(showsDto);
        }

        [AllowAnonymous]
        [HttpGet("{id:int}", Name = "GetShowById")]
        public async Task<IActionResult> GetShow(int id)
        {
            var show = await _repository.Shows.GetShowAsync(id);
            
            if (show == null)
            {
                return NotFound($"Show with id: {id} doesn't exist in the database.");
            }

            var showsDto = _mapper.Map<ShowDto>(show);
            
            return Ok(showsDto);
        }
        
        [AllowAnonymous]
        [HttpGet("{showId:int}/seats/sold")]
        public async Task<IActionResult> GetSoldSeats(int showId)
        {
            var show = await _repository.Shows.GetShowAsync(showId);
            
            if (show == null)
            {
                return NotFound($"Show with id: {showId} doesn't exist in the database.");
            }

            var soldSeats = show.Tickets.Select(ticket => ticket.TicketSeat.SeatPosition);

            var soldSeatsDto = _mapper.Map<IEnumerable<SeatPositionDto>>(soldSeats);
            
            return Ok(soldSeatsDto);
        }
        
        [AllowAnonymous]
        [HttpGet("{showId:int}/seats/prices")]
        public async Task<IActionResult> GetSeatPrices(int showId)
        {
            var show = await _repository.Shows.GetShowAsync(showId);
            
            if (show == null)
            {
                return NotFound($"Show with id: {showId} doesn't exist in the database.");
            }

            var seatPrices = show.TypePrices.Select(typePrice => new TypePrice
                {
                    Id = typePrice.Id,
                    SeatTypeId = typePrice.SeatTypeId,
                    Price = typePrice.Price
                }
            );

            return Ok(seatPrices);
        }
        
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateShow([FromBody] ShowForManipulationDto show)
        {
            var showEntity = _mapper.Map<Show>(show);

            await _repository.Shows.CreateShowAsync(showEntity);
            await _repository.SaveAsync();

            var showToReturn = _mapper.Map<ShowDto>(showEntity);

            return CreatedAtRoute("GetShowById", new { id = showToReturn.Id }, showToReturn);
        }
        
        [HttpDelete("{id:int}")]
        [ServiceFilter(typeof(ValidateShowExistsAttribute))]
        public async Task<ActionResult> DeleteShow(int id)
        {
            var show = HttpContext.Items["entity"] as Show;

            _repository.Shows.DeleteShow(show);
            await _repository.SaveAsync();

            return NoContent();
        }
        
        [HttpPut("{id:int}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [ServiceFilter(typeof(ValidateShowExistsAttribute))]
        public async Task<IActionResult> UpdateShow(int id, [FromBody] ShowForManipulationDto show)
        {
            var showEntity = HttpContext.Items["entity"] as Film;

            _mapper.Map(show, showEntity);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}