using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.Services;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Authorize(Policy = Policies.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        
        public ServicesController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet(Name = "GetServices")]
        public async Task<IActionResult> GetServices([FromQuery] ServiceParameters serviceParameters)
        {
            var services = await _repository.Services.GetServicesAsync(serviceParameters);

            var servicesDto = _mapper.Map<IEnumerable<ServiceDto>>(services);
                
            return Ok(servicesDto);
        }

        [AllowAnonymous]
        [HttpGet("{id:int}", Name = "GetServiceById")]
        public async Task<IActionResult> GetService(int id)
        {
            var service = await _repository.Services.GetServiceAsync(id);
            
            if (service == null)
            {
                return NotFound($"Service with id: {id} doesn't exist in the database.");
            }

            var serviceDto = _mapper.Map<ServiceDto>(service);
            
            return Ok(serviceDto);
        }
        
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateService([FromBody] ServiceForManipulationDto service)
        {
            var serviceEntity = _mapper.Map<Service>(service);

            await _repository.Services.CreateServiceAsync(serviceEntity);
            await _repository.SaveAsync();

            var serviceToReturn = _mapper.Map<ServiceDto>(serviceEntity);

            return CreatedAtRoute("GetServiceById", new { id = serviceToReturn.Id }, serviceToReturn);
        }
        
        [HttpDelete("{id:int}")]
        [ServiceFilter(typeof(ValidateServiceExistsAttribute))]
        public async Task<ActionResult> DeleteService(int id)
        {
            var service = HttpContext.Items["entity"] as Service;

            _repository.Services.DeleteService(service);
            await _repository.SaveAsync();

            return NoContent();
        }
        
        [HttpPut("{id:int}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [ServiceFilter(typeof(ValidateServiceExistsAttribute))]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceForManipulationDto service)
        {
            var serviceEntity = HttpContext.Items["entity"] as Service;

            _mapper.Map(service, serviceEntity);
            await _repository.SaveAsync();

            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet("/hall/", Name = "GetHallServices")]
        public async Task<IActionResult> GetHallServices([FromQuery] HallServiceParameters hallServiceParameters)
        {
            var hallServices = await _repository.HallServices.GetHallServicesAsync(hallServiceParameters);

            var hallServiceDto = _mapper.Map<IEnumerable<HallServiceDto>>(hallServices);
                
            return Ok(hallServiceDto);
        }

        [AllowAnonymous]
        [HttpGet("/hall/{id}", Name = "GetHallServiceById")]
        public async Task<IActionResult> GetHallService(int id)
        {
            var hallService = await _repository.HallServices.GetHallServiceAsync(id);
            
            if (hallService == null)
            {
                return NotFound($"HallService with id: {id} doesn't exist in the database.");
            }

            var hallServiceDto = _mapper.Map<HallServiceDto>(hallService);
            
            return Ok(hallServiceDto);
        }
        
        [HttpPost("/hall")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateService([FromBody] HallServiceForManipulationDto hallService)
        {
            var hallServiceEntity = _mapper.Map<HallService>(hallService);

            await _repository.HallServices.CreateHallServiceAsync(hallServiceEntity);
            await _repository.SaveAsync();

            var hallServiceToReturn = _mapper.Map<HallServiceDto>(hallServiceEntity);

            return CreatedAtRoute("GetHallServiceById", new { id = hallServiceToReturn.Id }, hallServiceToReturn);
        }
        
        [HttpDelete("/hall/{id}")]
        [ServiceFilter(typeof(ValidateHallServiceExistsAttribute))]
        public async Task<ActionResult> DeleteHallService(int id)
        {
            var hallService = HttpContext.Items["entity"] as HallService;

            _repository.HallServices.DeleteHallService(hallService);
            await _repository.SaveAsync();

            return NoContent();
        }
        
        [HttpPut("/hall/{id}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [ServiceFilter(typeof(ValidateHallServiceExistsAttribute))]
        public async Task<IActionResult> UpdateHallService(int id, [FromBody] HallServiceForManipulationDto hallService)
        {
            var hallServiceEntity = HttpContext.Items["entity"] as HallService;

            _mapper.Map(hallService, hallServiceEntity);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}