using Isk.API.DTOs;
using Isk.API.Services;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Isk.API.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private readonly UserService _userService;

        public UserController()
        {
            _userService = new UserService();
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public IHttpActionResult GetAllUsers()
        {
            var res = _userService.GetAll();

            return Ok(res);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetUser(int id)
        {
            var user = _userService.GetUser(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }
        [HttpPost]
        [Route("NewUser")]
        public IHttpActionResult NewUser([FromBody] NewUserDto newUser)
        {
            var res = _userService.CreateUser(newUser);

            return Ok(res);
        }
        [HttpPost]
        [Route("BlockUser/{id:int}/{device:int}")]
        public IHttpActionResult BlockUser(int id, int device)
        {
            var res = _userService.BlockUser(id,device);

            return Ok(res);
        }

        [HttpPost]
        [Route("UnblockUser/{id:int}/{device:int}")]
        public IHttpActionResult UnblockUser([FromBody] UnblockUserReqDto req,  int id, int device)
        {
            var res = _userService.UnblockUser(id,req.StartDate,req.EndDate, device);
            return Ok(res);
        }

        [HttpPost]
        [Route("DeleteUserFromDevice/{id:int}/{device:int}")]
        public IHttpActionResult DeleteUserFromDevice( int id,int device)
        {
            return Ok(
                _userService.DeleteUserFromDevice(id, device));
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult UpdateUser(int id, [FromBody] UpdateUserDto dto)
        {
            if (dto == null)
            {
                return BadRequest( "Request body is required.");
            }

            var result =   _userService.UpdateUser(id,dto);

            return Ok(result);
        }
    }
}