using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Auth.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;

namespace Application.Auth.Commands
{
    public class RefreshTokenCommand : IRequest<(AuthUserForReturnDto, string)>
    {
        private readonly RefreshTokenDto _refreshTokenDto;

        public string RefreshToken { get; set; }

        public RefreshTokenCommand(RefreshTokenDto refreshTokenDto, string refreshToken)
        {
            _refreshTokenDto = refreshTokenDto;
            RefreshToken = refreshToken;
        }


        public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, (AuthUserForReturnDto, string)>
        {
            private readonly ITokenService _tokenService;
            private readonly IIdentityService _identityService;
            private readonly IFileService _fileService;
            private readonly IMapper _mapper;

            public RefreshTokenCommandHandler(ITokenService jwtService,
                IIdentityService identityService,
                IFileService fileService,
                IMapper mapper)
            {
                _tokenService = jwtService;
                _identityService = identityService;
                _fileService = fileService;
                _mapper = mapper;
            }

            public async Task<(AuthUserForReturnDto, string)> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
            {
                //Gets the principal from the expired token 
                var principal = _tokenService.GeneratePrincipalFromAnExpiredToken(request._refreshTokenDto.Token);

                if (principal == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, "Invalid token");
                }

                // Get the username from the principal
                var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                //Find the user by his name
                var user = await _identityService.FindUserByEmailAsync(email);

                if (user == null ||
                    user.RefreshToken != request.RefreshToken ||
                    user.RefreshTokenExpiry < DateTime.Now)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                //Generates a new refresh token for the user
                user.RefreshToken = _tokenService.GenerateRefreshToken();
                user.RefreshTokenExpiry = DateTime.Now.AddDays(30);
                await _identityService.UpdateUserAsync(user);



                var userToReturn = _mapper.Map<AuthUserForReturnDto>(user);
                userToReturn.AccessToken = _tokenService.GenerateAccessToken(user);

                return (userToReturn, user.RefreshToken);

            }
        }
    }
}