using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Order;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Application.Services;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : Controller
    {
        private readonly IRepositoryManager _repository;
        private readonly OrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IRepositoryManager repository, OrderService orderService, IMapper mapper)
        {
            _repository = repository;
            _orderService = orderService;
            _mapper = mapper;
        }

        [Authorize(Policy = Policies.User)]
        [HttpGet]
        public async Task<IActionResult> GetUserOrders([FromQuery] OrderParameters orderParameters)
        {
            var userId = GetAuthorizedUserId();

            orderParameters.UserId = userId;

            var orders = await _repository.Orders.GetOrdersAsync(orderParameters);

            var ordersDto = _mapper.Map<IEnumerable<OrderDto>>(orders);

            return Ok(ordersDto);
        }

        [Authorize(Policy = Policies.User)]
        [HttpPost("validate")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> ValidateBuy([FromBody] OrderDetailsDto details)
        {
            var orderDetails = _mapper.Map<OrderDetails>(details);

            var userId = GetAuthorizedUserId();

            var result = await _orderService.OrderCheckout(orderDetails, userId);

            if (result)
            {
                return Ok();
            }

            return BadRequest("Incorrect order data.");
        }

        private int GetAuthorizedUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IEnumerable<Claim> claim = identity.Claims;

            var userIdClaim = claim.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

            return int.Parse(userIdClaim.Value);
        }
    }
}