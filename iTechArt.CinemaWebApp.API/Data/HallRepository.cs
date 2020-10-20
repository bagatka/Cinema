﻿using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class HallRepository : RepositoryBase<Hall>, IHallRepository
    {
        public HallRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}