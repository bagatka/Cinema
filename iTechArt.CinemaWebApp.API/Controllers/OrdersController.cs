﻿using System.Collections.Generic;

using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.ActionFilters;
using iTechArt.CinemaWebApp.API.Application.DTOs.Order;
using iTechArt.CinemaWebApp.API.Application.Services;
using iTechArt.CinemaWebApp.API.Models;
using Microsoft.IdentityModel.JsonWebTokens;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : Controller
    {
        private readonly OrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(OrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
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