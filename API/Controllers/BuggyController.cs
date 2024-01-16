using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{    
    public class BuggyController(DataContext context) : BaseApiController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret(){
            return "secret text";
        }

        [HttpGet("not-found")] // 404
        public ActionResult<string> GetNotFound(){
            var thing = context.Users.Find(-1);            
            if(thing==null) return NotFound();            
            return Ok();
        }
        
        [HttpGet("server-error")] //500
        public ActionResult<string> GetServerError(){
            var thing = context.Users.Find(-1);
            return thing.ToString();
        }

        [HttpGet("bad-request")] // 400
        public ActionResult<string> GetBadRequest(){
            return BadRequest("this was not a good request");
        }
    }
}