using System;
using System.Threading.Tasks;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using iTechArt.CinemaWebApp.API.Application.DTOs;
using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Models;

using BCrypter = BCrypt.Net.BCrypt;

using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.Wrappers;

namespace iTechArt.CinemaWebApp.API.Application.Services
{
    public class AccountService
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly CinemaDbContext _context;

        public AccountService(IConfiguration configuration,
            IMapper mapper,
            CinemaDbContext cinemaDbContext)
        {
            _context = cinemaDbContext;
            _mapper = mapper;
            _config = configuration;
        }
        public async Task<Response<LoginResponse>> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == request.Email);

            if(user == null)
            {
                return new Response<LoginResponse>($"No Accounts Registered with {request.Email}.");
            }

            var validatePassword = BCrypter.EnhancedVerify(request.Password, user.PasswordHash);
            
            if(!validatePassword)
            {
                return new Response<LoginResponse>($"Invalid Credentials for {request.Email}.");
            }

            var jwtSecurityToken = GenerateJWTToken(user);
            var response = _mapper.Map<LoginResponse>(user);
            response.JWToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return new Response<LoginResponse>(response, $"{request.Email} has been successfully logged in.");
        }

        public async Task<Response<LoginResponse>> RegisterAsync(RegisterRequest request)
        {
            var userWithSameUserName = await _context.Users.FirstOrDefaultAsync(user => user.UserName.ToLower() == request.UserName.ToLower());

            if (userWithSameUserName != null)
            {
                return new Response<LoginResponse>($"A user with {request.UserName} username already exists.");
            }

            var userWithSameEmail = await _context.Users.FirstOrDefaultAsync(user => user.Email == request.Email);

            if (userWithSameEmail != null)
            {
                return new Response<LoginResponse>($"A user with {request.Email} email already exists.");
            }

            var hashedPassword = BCrypter.HashPassword(request.Password);
            var newUser = _mapper.Map<User>(request);
            newUser.PasswordHash = hashedPassword;
            newUser.Role = Policies.User;
            await _context.AddAsync(newUser);
            await _context.SaveChangesAsync();

            var jwtSecurityToken = GenerateJWTToken(newUser);
            var response = _mapper.Map<LoginResponse>(newUser);
            response.JWToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return new Response<LoginResponse>(response, $"{request.Email} has been successfully registered.");
        }
        private JwtSecurityToken GenerateJWTToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.Unicode.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("firstName", userInfo.FirstName.ToString()),
                new Claim("lastName", userInfo.LastName.ToString()),
                new Claim("role",userInfo.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return token;
        }
    }
}
