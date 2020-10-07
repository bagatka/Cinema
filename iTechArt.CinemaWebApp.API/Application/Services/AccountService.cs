using System;
using System.Threading.Tasks;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using BCrypter = BCrypt.Net.BCrypt;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Models;
using iTechArt.CinemaWebApp.API.Application.DTOs.Account;

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
        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == request.Email);

            if(user == null)
            {
                return null;
            }

            var validatePassword = BCrypter.EnhancedVerify(request.Password, user.PasswordHash);
            
            if(!validatePassword)
            {
                return null;
            }

            var jwtSecurityToken = GenerateJWTToken(user);
            var response = _mapper.Map<LoginResponse>(user);
            response.JWToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return response;
        }

        public async Task<bool?> RegisterAsync(RegisterRequest request)
        {
            var userWithSameUserName = await _context.Users.FirstOrDefaultAsync(user => user.UserName.ToLower() == request.UserName.ToLower());

            if (userWithSameUserName != null)
            {
                return null;
            }

            var userWithSameEmail = await _context.Users.FirstOrDefaultAsync(user => user.Email == request.Email);

            if (userWithSameEmail != null)
            {
                return null;
            }

            var hashedPassword = BCrypter.HashPassword(request.Password);
            var newUser = _mapper.Map<User>(request);
            newUser.PasswordHash = hashedPassword;
            newUser.Role = Policies.User;
            var result = await _context.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return true;
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
