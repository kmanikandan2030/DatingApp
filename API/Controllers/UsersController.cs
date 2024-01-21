using API.DTOs;
using API.Entities;
using API.Interfaces.IRepositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository repository, IMapper mapper) : BaseApiController
{

  
  [HttpGet]
  public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
    var users = await repository.GetMembersAsync();                
    //var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);
    return Ok(users);
  }

  [AllowAnonymous]
  [HttpGet("{id:int}")]
  public async Task<ActionResult<MemberDto>> GetUser(int id){
    var user = await repository.GetUserByIdAsync(id);    
    if (user==null) return NotFound();
    var userToReturn = mapper.Map<MemberDto>(user);
    return Ok(userToReturn);   
  }

  [HttpGet("{username}")]
  public async Task<ActionResult<MemberDto>> GetUserByName(string username){
    var user = await repository.GetMemberAsync(username);    
    if (user==null) return NotFound();
    //var userToReturn = mapper.Map<MemberDto>(user);
    return Ok(user);
  }

  [HttpPut]
  public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var user = await repository.GetUserByNameAsync(username);

        if(user==null) return NotFound();

        mapper.Map(memberUpdateDto, user);

        if (await repository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }

}

  /* [HttpGet]
  public async Task<IActionResult> GetUsers(){

    return await Task.Run(()=>Ok("Welcome"));
  } 
  
   /* var currentUser = HttpContext.User;
    int spendingTimeWithCompany = 0;

    if(currentUser.HasClaim(c => c.Type == nameof(user.DOJ))){
      DateTime date = DateTime.Parse(currentUser.Claims.FirstOrDefault(c => c.Type == nameof(user.DOJ)).Value);
      spendingTimeWithCompany = DateTime.Today.Year - date.Year;
    }    
    if(spendingTimeWithCompany>5)
      return Ok(new {
          user,
          LoggedInUser="Executive"
      });
    else
     return Ok(user); */
  

