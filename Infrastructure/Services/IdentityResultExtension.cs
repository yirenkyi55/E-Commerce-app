using System.Linq;
using Application.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    public static class IdentityResultExtension
    {
        public static Result ToApplicationResult(this IdentityResult result)
        {
            return result.Succeeded ? Result.Success() :
                Result.Failure(result.Errors.Select(er => er.Description));
        }
    }
}