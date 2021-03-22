using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Application.Common.Interfaces;
using Domain.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly IIdentityService _identityService;

        public TokenService(IConfiguration configuration, IIdentityService identityService)
        {
            _configuration = configuration;
            _identityService = identityService;
        }
        public string GenerateAccessToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            //Generates the roles for the token
            var rolesForUser = _identityService.GetRolesForUser(user).Result;
            claims.AddRange(rolesForUser.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Application:Key"]));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(descriptor);
            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal GeneratePrincipalFromAnExpiredToken(string token)
        {
            //Generates a token Validation parameters
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                // ValidIssuer = _configuration["Application:Issuer"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Application:Key"])),
                ValidateLifetime = false //the token is already expired and we don't want to validate the lifetime
            };

            //Generates a token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            //We check if the security token is of type JwtSecurityToken
            //or the algorithm specified is the one used in creating the token
            if (!(securityToken is JwtSecurityToken jwtSecurityToken) ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512,
                    StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }

            //We can now return the principal, using this principal,
            //we can access the users info from the principal claims
            return principal;
        }

        public string GenerateRefreshToken()
        {
            var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var salt = new byte[32];
            rngCryptoServiceProvider.GetBytes(salt);
            return Convert.ToBase64String(salt);
        }
    }
}