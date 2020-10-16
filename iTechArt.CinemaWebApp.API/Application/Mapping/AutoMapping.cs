using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.DTOs;
using iTechArt.CinemaWebApp.API.Application.DTOs.Account;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<User, LoginResponse>();
            CreateMap<RegisterRequest, User>();
            CreateMap<Film, FilmDto>();
            CreateMap<Show, ShowDto>()
                .ForMember(showDto => showDto.FilmTitle,
                    src => src.MapFrom(show => show.Film.Title))
                .ForMember(showDto => showDto.CinemaName,
                    src => src.MapFrom(show => show.Hall.Cinema.Name));
        }
    }
}
