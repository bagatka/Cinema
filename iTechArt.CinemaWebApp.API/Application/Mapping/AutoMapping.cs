﻿using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.DTOs.Account;
using iTechArt.CinemaWebApp.API.Application.DTOs.Cinema;
using iTechArt.CinemaWebApp.API.Application.DTOs.Film;
using iTechArt.CinemaWebApp.API.Application.DTOs.Hall;
using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.Seat;
using iTechArt.CinemaWebApp.API.Application.DTOs.Services;
using iTechArt.CinemaWebApp.API.Application.DTOs.Show;
using iTechArt.CinemaWebApp.API.Application.DTOs.Ticket;
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

            CreateMap<FilmForCreationDto, Film>();

            CreateMap<FilmForUpdateDto, Film>();

            CreateMap<Cinema, CinemaDto>();

            CreateMap<CinemaForCreationDto, Cinema>();

            CreateMap<CinemaForUpdateDto, Cinema>();

            CreateMap<Show, ShowDto>()
                .ForMember(
                    showDto => showDto.FilmTitle,
                    src => src.MapFrom(show => show.Film.Title))
                .ForMember(
                    showDto => showDto.CinemaName,
                    src => src.MapFrom(show => show.Hall.Cinema.Name)
                )
                .ForMember(
                    showDto => showDto.FilmPosterUrl,
                    src => src.MapFrom(show => show.Film.PosterUrl)
                );

            CreateMap<ShowForCreationDto, Show>();

            CreateMap<ShowForUpdateDto, Show>();
            
            CreateMap<Hall, HallDto>()
                .ForMember(
                    hallDto => hallDto.CinemaName,
                    src => src.MapFrom(hall => hall.Cinema.Name)
                );

            CreateMap<HallForCreationDto, Hall>();

            CreateMap<HallForUpdateDto, Hall>();

            CreateMap<HallService, HallServiceDto>()
                .ForMember(
                    hallServiceDto => hallServiceDto.Name,
                    src => src.MapFrom(hallService => hallService.Service.Name)
                )
                .ForMember(hallServiceDto => hallServiceDto.Description,
                    src => src.MapFrom(serviceHall => serviceHall.Service.Description)
                )
                .ForMember(hallServiceDto => hallServiceDto.IconUrl,
                    src => src.MapFrom(serviceHall => serviceHall.Service.IconUrl)
                );

            CreateMap<HallServiceForCreationDto, HallService>();

            CreateMap<HallServiceForUpdateDto, HallService>();

            CreateMap<Seat, SeatDto>()
                .ForMember(
                    seatDto => seatDto.HallName,
                    src => src.MapFrom(seat => seat.Hall.Name)
                );

            CreateMap<SeatForCreationDto, Seat>();

            CreateMap<SeatForUpdateDto, Seat>();

            CreateMap<Service, ServiceDto>();

            CreateMap<ServiceForCreationDto, Service>();

            CreateMap<ServiceForUpdateDto, Service>();

            CreateMap<Ticket, TicketDto>()
                .ForMember(
                    ticketDto => ticketDto.HallName,
                    src => src.MapFrom(ticket => ticket.Seat.Hall.Name)
                )
                .ForMember(
                    ticketDto => ticketDto.CinemaName,
                    src => src.MapFrom(ticket => ticket.Seat.Hall.Cinema.Name)
                )
                .ForMember(
                    ticketDto => ticketDto.FilmTitle,
                    src => src.MapFrom(ticket => ticket.Show.Film.Title)
                )
                .ForMember(
                    ticketDto => ticketDto.StartDateTime,
                    src => src.MapFrom(ticket => ticket.Show.StartDateTime)
                )
                .ForMember(
                    ticketDto => ticketDto.UserName,
                    src => src.MapFrom(ticket => ticket.User.UserName)
                )
                .ForMember(
                    ticketDto => ticketDto.Seat,
                    src => src.MapFrom(ticket => ticket.Seat.SeatNumber)
                )
                .ForMember(
                    ticketDto => ticketDto.Row,
                    src => src.MapFrom(ticket => ticket.Seat.Row)
                );

            CreateMap<TicketForCreationDto, Ticket>();

            CreateMap<TicketForUpdateDto, Ticket>();
        }
    }
}