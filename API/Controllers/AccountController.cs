using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class AccountController(DataContext context, ITokenService tokenService)  : BaseApiController
    {

        [HttpPost("register")]   
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto){
            if(await UserExists(registerDto.Username)) return BadRequest("Username is taken.");
                
            using var hmac = new HMACSHA512();
            var user = new AppUser{
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                //Email = registerDto.Email,
                //DOJ =  string.IsNullOrEmpty(registerDto.DOJ)? DateOnly.FromDateTime(DateTime.Now): DateOnly.Parse(registerDto.DOJ)
            };
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
            
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.SingleOrDefaultAsync(u=>u.UserName==loginDto.Username);

            if(user==null) return Unauthorized("User not found");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i]!=user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
            return new UserDto {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username){
            return await context.Users.AnyAsync(u=>u.UserName.ToLower()==username.ToLower());
        }
    }

    
}