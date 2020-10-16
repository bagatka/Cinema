using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
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

        [HttpGet]
        public async Task<IActionResult> GetFilms()
        {
            var films = await _repository.Films.GetAllFilmsAsync(trackChanges: false);

            var filmsDto = _mapper.Map<IEnumerable<FilmDto>>(films);
                
            return Ok(filmsDto);
        }

        [HttpGet("{id}")]
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
    }
}