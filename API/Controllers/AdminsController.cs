using System.Threading.Tasks;
using Application.Admins.Commands;
using Application.Admins.Dtos;
using Application.Admins.Queries;
using Application.Auth.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/admins")]
    [Authorize(Roles = "admin")]
    public class AdminsController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<AdminUserForReturnDto>> CreateAdmins(AuthUserForCreateDto authUserForCreate)
        {
            var result = await Mediator.Send(new CreateAdminUsersCommand { AuthUser = authUserForCreate });

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<AdminUserForReturnDto>> GetAllAdmins()
        {
            var result = await Mediator.Send(new GetAllAdminsQuery());
            return Ok(result);
        }
    }
}