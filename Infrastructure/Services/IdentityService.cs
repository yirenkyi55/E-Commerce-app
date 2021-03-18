using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<User> _userManager;

        public IdentityService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<bool> CheckPasswordValidityAsync(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<Result> ConfirmEmailAsync(User user, string code)
        {
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return result.ToApplicationResult();
        }

        public async Task<(Result result, User user)> CreateUserAsync(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            return (result.ToApplicationResult(), user);
        }

        public async Task<User> FindUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<User> FindUserByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<User> FindUserByNameAsync(string name)
        {
            return await _userManager.FindByNameAsync(name);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(User user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<string> GeneratePasswordResetToken(User user)
        {
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public async Task<List<string>> GetRolesForUser(User user)
        {
            return (await _userManager.GetRolesAsync(user)).ToList();
        }

        public async Task<bool> HasConfirmedEmailAsync(User user)
        {
            return await _userManager.IsEmailConfirmedAsync(user);
        }

        public async Task<Result> ResetPasswordAsync(User user, string passwordResetToken, string password)
        {
            var result = await _userManager.ResetPasswordAsync(user, passwordResetToken, password);
            return result.ToApplicationResult();
        }

        public async Task<Result> UpdateUserAsync(User user)
        {
            var result = await _userManager.UpdateAsync(user);
            return result.ToApplicationResult();
        }
    }
}