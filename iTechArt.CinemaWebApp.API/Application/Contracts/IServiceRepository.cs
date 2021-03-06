﻿using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IServiceRepository
    {
        Task<PagedList<Service>> GetServicesAsync(ServiceParameters serviceParameters);
        Task<Service> GetServiceAsync(int serviceId);
        Task CreateServiceAsync(Service service);
        void DeleteService(Service service);
    }
}