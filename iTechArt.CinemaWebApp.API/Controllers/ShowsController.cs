using System.Threading.Tasks;
using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.DTOs;
using iTechArt.CinemaWebApp.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : Controller
    {
        private readonly CinemaDbContext _context;
        private readonly IMapper _mapper;

        public ShowsController(CinemaDbContext cinemaDbContext, IMapper mapper)
        {
            _context = cinemaDbContext;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShowDTO>> GetShowById(int id)
        {
            var show = await _context.Shows.FindAsync(id);

            if (show == null)
            {
                return NotFound($"No show found with id: {id}.");
            }

            return _mapper.Map<CinemaDTO>(cinema);
        }
    }
}