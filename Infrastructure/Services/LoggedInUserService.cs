using System.Linq;
using System.Security.Claims;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    
    public class LoggedInUserService: ILoggedInUserService
    {
      
        private readonly IHttpContextAccessor _contextAccessor;

        public LoggedInUserService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }
        
        public string GetLoggedInUserEmail()
        {
            return _contextAccessor
                .HttpContext?.User?
                .Claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;


        }


    }
}