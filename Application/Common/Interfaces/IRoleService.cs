using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Models;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.Common.Interfaces
{
    public interface IRoleService
    {
        Task<Result> CreateRoleAsync(string roleName);

        Task<IdentityRole> GetRoleByIdAsync(string roleId);

        Task<IdentityRole> GetRoleByNameAsync(string name);


        IQueryable<IdentityRole> GetAllRoles();

        Task<Result> UpdateRoleAsync(IdentityRole role);

        Task<Result> DeleteRoleAsync(IdentityRole role);

        Task<List<User>> GetAllUsersInARole(string roleName);

        Task<List<User>> GetAllUsersNotInRole(string roleName);

        Task<bool> RoleExistsAsync(string roleName);

    }
}