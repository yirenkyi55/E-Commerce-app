using System;
using System.Net;
using System.Threading.Tasks;
using Application.Auth.Commands;
using Application.Auth.Dtos;
using Application.Auth.Queries;
using Application.Common.Exceptions;
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
            var (userToReturn, user) = await Mediator.Send(new CreateAccountCommand { AuthUser = authUser });

            SetTokenCookie(user.RefreshToken);

            return Ok(userToReturn);
        }

        [AllowAnonymous]
        [HttpGet("emailExists")]
        public async Task<ActionResult<bool>> CheckEmailExistence([FromQuery] CheckEmailExistenceQuery query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<ActionResult<AuthUserForReturnDto>> RefreshToken(RefreshTokenDto command)
        {
            //Retrieve the refresh token from the cookies
            var refreshTokenFromUser = Request.Cookies["refreshToken"];
            if (refreshTokenFromUser == null)
                throw new RestException(HttpStatusCode.Unauthorized);

            //Pass the refresh token together with the dto to the command
            var (result, refreshToken) = await Mediator.Send(new RefreshTokenCommand(command, refreshTokenFromUser));
            SetTokenCookie(refreshToken);
            return Ok(result);
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