using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Domain.Identity;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<User> FindUserByEmailAsync(string email);

        Task<User> FindUserByNameAsync(string name);

        Task<User> FindUserByIdAsync(string id);

        Task<(Result result, User user)> CreateUserAsync(User user, string password);

        Task<string> GenerateEmailConfirmationTokenAsync(User user);

        Task<Result> ConfirmEmailAsync(User user, string code);

        Task<bool> CheckPasswordValidityAsync(User user, string password);

        Task<bool> HasConfirmedEmailAsync(User user);

        Task<Result> UpdateUserAsync(User user);

        Task<string> GeneratePasswordResetToken(User user);

        Task<Result> ResetPasswordAsync(User user, string passwordResetToken, string password);

        Task<List<string>> GetRolesForUser(User user);

        Task<Result> AddUserToRoleAsync(User user, string role);

        Task<bool> IsInRoleAsync(User user, string role);
    }
}