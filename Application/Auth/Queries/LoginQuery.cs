using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Auth.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using MediatR;

namespace Application.Auth.Queries
{
    public class LoginQuery : IRequest<(AuthUserForReturnDto, string)>
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public class LoginQueryHandler : IRequestHandler<LoginQuery, (AuthUserForReturnDto, string)>
        {
            private readonly IIdentityService _identityService;
            private readonly ITokenService _tokenService;

            private readonly IMapper _mapper;

            public LoginQueryHandler(
                IIdentityService identityService,
                ITokenService tokenService,
                IMapper mapper)
            {
                _identityService = identityService;
                _tokenService = tokenService;
                _mapper = mapper;
            }
            public async Task<(AuthUserForReturnDto, string)> Handle(LoginQuery request, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindUserByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "Invalid email address and/or password");
                }

                if (!await _identityService.CheckPasswordValidityAsync(user, request.Password))
                {
                    throw new RestException(HttpStatusCode.BadRequest, "Invalid email address and/or password");
                }


                user.RefreshToken = _tokenService.GenerateRefreshToken();
                user.RefreshTokenExpiry = DateTime.Now.AddDays(AppSettings.RefreshTokenLength);

                await _identityService.UpdateUserAsync(user);

                var userToReturn = _mapper.Map<AuthUserForReturnDto>(user);
                userToReturn.AccessToken = _tokenService.GenerateAccessToken(user);

                var rolesForUse = await _identityService.GetRolesForUser(user);

                userToReturn.Roles = rolesForUse;

                return (userToReturn, user.RefreshToken);

            }
        }
    }
}