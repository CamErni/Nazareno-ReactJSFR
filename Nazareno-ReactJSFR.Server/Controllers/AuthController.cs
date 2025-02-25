// AuthController.cs - Updated to validate users against the database with multiple roles
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Nazareno_ReactJSFR.Server.Models;

namespace Nazareno_ReactJSFR.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly QuestionDbContext _context;

        public AuthController(QuestionDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username && u.Password == loginDto.Password);

            if (existingUser == null)
            {
                return Unauthorized();
            }

            var roles = existingUser.RoleList; // Get the user's roles

            var token = GenerateJwtToken(existingUser.Username, roles);
            return Ok(new { Token = token, Roles = roles });
        }

        private string GenerateJwtToken(string username, List<string> roles)
        {
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            // Add multiple role claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSecret5906783045y5654p865fdjfljasdfdfsdfsKey"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7115",
                audience: "https://localhost:7115",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
