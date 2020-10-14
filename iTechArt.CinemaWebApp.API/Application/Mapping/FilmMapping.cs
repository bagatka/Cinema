using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.DTOs.Film;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Mapping
{
    public class FilmMapping : Profile
    {
        public FilmMapping()
        {
            CreateMap<FilmDTO, Film>();
            CreateMap<Film, FilmDTO>();
            CreateMap<Film, FilmCarouselDTO>();
        }
    }
}