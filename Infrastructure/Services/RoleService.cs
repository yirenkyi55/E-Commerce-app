using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Identity;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        public RoleService(
        RoleManager<IdentityRole> roleManager,
        UserManager<User> userManager,
        ApplicationDbContext context
        )
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }
        public async Task<Result> CreateRoleAsync(string roleName)
        {
            var role = new IdentityRole { Name = roleName };
            var result = await _roleManager.CreateAsync(role);
            return result.ToApplicationResult();
        }

        public async Task<Result> DeleteRoleAsync(IdentityRole role)
        {
            var result = await _roleManager.DeleteAsync(role);
            return result.ToApplicationResult();
        }

        public IQueryable<IdentityRole> GetAllRoles()
        {
            return _roleManager.Roles;
        }

        public async Task<List<User>> GetAllUsersInARole(string roleName)
        {
            var users = await _userManager.Users.ToListAsync();
            var usersInRole = new List<User>();

            foreach (var user in users)
            {
                if (await _userManager.IsInRoleAsync(user, roleName))
                {
                    usersInRole.Add(user);
                }
            }

            return usersInRole;

        }

        public async Task<List<User>> GetAllUsersNotInRole(string roleName)
        {
            var users = await _userManager.Users.ToListAsync();
            var usersNotInRole = new List<User>();

            foreach (var user in users)
            {
                if (!await _userManager.IsInRoleAsync(user, roleName))
                {
                    usersNotInRole.Add(user);
                }
            }

            return users;
        }

        public async Task<IdentityRole> GetRoleByIdAsync(string roleId)
        {
            return await _roleManager.FindByIdAsync(roleId);
        }

        public async Task<IdentityRole> GetRoleByNameAsync(string name)
        {
            return await _roleManager.FindByNameAsync(name);
        }

        public async Task<bool> RoleExistsAsync(string roleName)
        {
            return await _roleManager.RoleExistsAsync(roleName);
        }

        public async Task<Result> UpdateRoleAsync(IdentityRole role)
        {
            var result = await _roleManager.UpdateAsync(role);
            return result.ToApplicationResult();
        }
    }
}