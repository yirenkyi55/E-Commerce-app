using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Auth.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Identity;
using MediatR;

namespace Application.Auth.Commands
{
    public class CreateAccountCommand : IRequest<(AuthUserForReturnDto, string)>
    {
        public AuthUserForCreateDto AuthUser { get; set; }
        public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, (AuthUserForReturnDto, string)>
        {
            private readonly IIdentityService _identityService;
            private readonly IMapper _mapper;
            private readonly ITokenService _tokenService;

            public CreateAccountCommandHandler(
                IIdentityService identityService,
             IMapper mapper,
             ITokenService tokenService)
            {
                _identityService = identityService;
                _mapper = mapper;
                _tokenService = tokenService;
            }
            public async Task<(AuthUserForReturnDto, string)> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
            {
                if (await _identityService.FindUserByEmailAsync(request.AuthUser.Email) != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "This Email address already exists.");
                }

                var userToCreate = _mapper.Map<User>(request.AuthUser);

                userToCreate.UserName = userToCreate.Email;

                var (result, user) = await _identityService.CreateUserAsync(userToCreate, request.AuthUser.Password);

                if (!result.Succeeded)
                {
                    throw new RestException(HttpStatusCode.BadRequest, result.Errors);
                }

                user.RefreshToken = _tokenService.GenerateRefreshToken();
                user.RefreshTokenExpiry = DateTime.Now.AddDays(AppSettings.RefreshTokenLength);

                await _identityService.UpdateUserAsync(user);

                var userToReturn = _mapper.Map<AuthUserForReturnDto>(user);
                userToReturn.AccessToken = _tokenService.GenerateAccessToken(user);

                return (userToReturn, user.RefreshToken);
            }
        }
    }
}