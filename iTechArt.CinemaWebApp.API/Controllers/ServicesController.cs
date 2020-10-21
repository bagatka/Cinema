using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Services;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
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

        [HttpGet(Name = "GetServices")]
        public async Task<IActionResult> GetServices([FromQuery] ServiceParameters serviceParameters)
        {
            var services = await _repository.Services.GetAllServicesAsync(serviceParameters, trackChanges: false);

            var servicesDto = _mapper.Map<IEnumerable<ServiceDto>>(services);
                
            return Ok(servicesDto);
        }

        [HttpGet("{id}", Name = "GetServiceById")]
        public async Task<IActionResult> GetService(int id)
        {
            var service = await _repository.Services.GetServiceAsync(id, trackChanges: false);
            
            if (service == null)
            {
                return NotFound($"Service with id: {id} doesn't exist in the database.");
            }

            var serviceDto = _mapper.Map<ServiceDto>(service);
            
            return Ok(serviceDto);
        }
        
        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateService([FromBody] ServiceForCreationDto service)
        {
            var serviceEntity = _mapper.Map<Service>(service);

            await _repository.Services.CreateServiceAsync(serviceEntity);
            await _repository.SaveAsync();

            var serviceToReturn = _mapper.Map<ServiceDto>(serviceEntity);

            return CreatedAtRoute("GetServiceById", new { id = serviceToReturn.Id }, serviceToReturn);
        }

        [HttpDelete("{id}")]
        [ServiceFilter(typeof(ValidateServiceExistsAttribute))]
        public async Task<ActionResult> DeleteService(int id)
        {
            var service = HttpContext.Items["entity"] as Service;

            _repository.Services.DeleteService(service);
            await _repository.SaveAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [ServiceFilter(typeof(ValidateServiceExistsAttribute))]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceForUpdateDto service)
        {
            var serviceEntity = HttpContext.Items["entity"] as Service;

            _mapper.Map(service, serviceEntity);
            await _repository.SaveAsync();

            return NoContent();
        }
    }
}