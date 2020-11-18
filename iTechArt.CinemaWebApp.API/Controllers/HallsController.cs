using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Hall;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallsController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        
        public HallsController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        
        [AllowAnonymous]
        [HttpGet("{id:int}", Name = "GetHallById")]
        public async Task<IActionResult> GetHall(int id)
        {
            var hall = await _repository.Halls.GetHallAsync(id);
            
            if (hall == null)
            {
                return NotFound($"Hall with id: {id} doesn't exist in the database.");
            }

            var hallDto = _mapper.Map<HallFullDto>(hall);
            
            return Ok(hallDto);
        }
    }
}