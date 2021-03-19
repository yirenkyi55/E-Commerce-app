using System;
using System.Threading.Tasks;
using Application.Auth.Commands;
using Application.Auth.Dtos;
using Application.Auth.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/auth")]
    public class AuthController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginQuery login)
        {
            var (userToReturn, refreshToken) = await Mediator.Send(login);

            SetTokenCookie(refreshToken);

            return Ok(userToReturn);
        }

        [AllowAnonymous]
        [HttpPost("account")]
        public async Task<ActionResult<AuthUserForReturnDto>> CreateAccount(AuthUserForCreateDto authUser)
        {
            var (userToReturn, refreshToken) = await Mediator.Send(new CreateAccountCommand { AuthUser = authUser });

            SetTokenCookie(refreshToken);

            return Ok(userToReturn);
        }

        private void SetTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}