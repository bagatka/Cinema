using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using BCrypter = BCrypt.Net.BCrypt;

using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;
using iTechArt.CinemaWebApp.API.Application.DTOs.Account;
using iTechArt.CinemaWebApp.API.Application.Wrappers;

namespace iTechArt.CinemaWebApp.API.Application.Services
{
    public class AccountService
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repository;

        public AccountService(IConfiguration configuration,
            IMapper mapper,
            IRepositoryManager repository)
        {
            _repository = repository;
            _mapper = mapper;
            _config = configuration;
        }

        public async Task<Response<LoginResponse>> LoginAsync(LoginRequest request)
        {
            var user = await _repository.Users.GetUserByEmailAsync(request.Email);

            if (user == null)
            {
                return new Response<LoginResponse>($"No accounts registered with {request.Email}.");
            }

            var validatePassword = BCrypter.Verify(request.Password, user.PasswordHash);

            if (!validatePassword)
            {
                return new Response<LoginResponse>($"Invalid credentials for {request.Email}.");
            }

            var response = GetReponseWithJWT(user);

            return new Response<LoginResponse>(response, $"{request.Email} has been successfully logged in.");
        }

        public async Task<Response<LoginResponse>> RegisterAsync(RegisterRequest request)
        {
            var userWithSameUserName =
                await _repository.Users.GetUserByUsernameAsync(request.UserName);

            if (userWithSameUserName != null)
            {
                return new Response<LoginResponse>($"A user with {request.UserName} username already exists.");
            }

            var userWithSameEmail = await _repository.Users.GetUserByEmailAsync(request.Email);

            if (userWithSameEmail != null)
            {
                return new Response<LoginResponse>($"A user with {request.Email} email already exists.");
            }

            var hashedPassword = BCrypter.HashPassword(request.Password);
            
            var newUser = _mapper.Map<User>(request);
            newUser.PasswordHash = hashedPassword;
            newUser.Role = Policies.User;
            
            await _repository.Users.CreateUserAsync(newUser);
            await _repository.SaveAsync();

            var response = GetReponseWithJWT(newUser);

            return new Response<LoginResponse>(response, $"{request.Email} has been successfully registered.");
        }

        private JwtSecurityToken GenerateJwtToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.Unicode.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(
                    JwtRegisteredClaimNames.Sub,
                    userInfo.Id.ToString()),
                new Claim(
                    "userName",
                    userInfo.UserName),
                new Claim(
                    "role",
                    userInfo.Role),
                new Claim(
                    "email",
                    userInfo.Email
                )
            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);
            return token;
        }

        private LoginResponse GetReponseWithJWT(User user)
        {
            var jwtSecurityToken = GenerateJwtToken(user);
            var response = _mapper.Map<LoginResponse>(user);
            response.JWToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return response;
        }
    }
}