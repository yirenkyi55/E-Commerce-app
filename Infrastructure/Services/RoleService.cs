using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    public class RoleService : IRoleService
    {
        public Task<Result> CreateRoleAsync(string roleName)
        {
            throw new System.NotImplementedException();
        }

        public Task<Result> DeleteRoleAsync(IdentityRole role)
        {
            throw new System.NotImplementedException();
        }

        public IQueryable<IdentityRole> GetAllRoles()
        {
            throw new System.NotImplementedException();
        }

        public Task<List<User>> GetAllUsersInARole(string roleName)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<User>> GetAllUsersNotInRole(string roleName)
        {
            throw new System.NotImplementedException();
        }

        public Task<IdentityRole> GetRoleByIdAsync(string roleId)
        {
            throw new System.NotImplementedException();
        }

        public Task<IdentityRole> GetRoleByNameAsync(string name)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> RoleExistsAsync(string roleName)
        {
            throw new System.NotImplementedException();
        }

        public Task<Result> UpdateRoleAsync(IdentityRole role)
        {
            throw new System.NotImplementedException();
        }
    }
}