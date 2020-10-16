using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs;


namespace iTechArt.CinemaWebApp.API.Controllers
{
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

        [HttpGet]
        public async Task<IActionResult> GetShows()
        {
            var shows = await _repository.Shows.GetAllShows(trackChanges: false);

            var showsDto = _mapper.Map<IEnumerable<ShowDto>>(shows);
                
            return Ok(showsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetShow(int id)
        {
            var show = await _repository.Shows.GetShow(id, trackChanges: false);
            
            if (show == null)
            {
                return NotFound($"Show with id: {id} doesn't exist in the database.");
            }

            var showsDto = _mapper.Map<ShowDto>(show);
            
            return Ok(showsDto);
        }
    }
}