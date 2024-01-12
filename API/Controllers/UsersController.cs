using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(DataContext context) : BaseApiController
{

  [AllowAnonymous]
  [HttpGet]
  public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers(){
    var users = await context.Users.ToListAsync();
    return Ok(users);
  }

  
  [HttpGet("{id}")]
  public async Task<ActionResult<AppUser>> GetUser(int id){
    var user = await context.Users.FindAsync(id);
    
    if (user==null) return NotFound();

    var currentUser = HttpContext.User;
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
     return Ok(user);
  }

  /* [HttpGet]
  public async Task<IActionResult> GetUsers(){

    return await Task.Run(()=>Ok("Welcome"));
  } */
}
