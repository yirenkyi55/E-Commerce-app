using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Domain.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;


namespace Infrastructure.Persistence.Seed
{
    public static class SeedData
    {
        public static async Task SeedAsync(
            ApplicationDbContext context,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IWebHostEnvironment hostEnvironment
        )
        {
            var jsonPath = Path.Combine(hostEnvironment.ContentRootPath, "Helpers", "seed");

            //Create roles if there are no roles
            if (!roleManager.Roles.Any())
            {
                // Seed default roles into the database
                var rolesFromFile = File.ReadAllText(Path.Combine(jsonPath, "Roles.json"));
                var defaultRoles = JsonSerializer.Deserialize<List<IdentityRole>>(rolesFromFile);

                foreach (var role in defaultRoles)
                {
                    await roleManager.CreateAsync(role);
                }
            }


            //check if there are no users in database, then we can seed some users
            if (!context.Users.Any())
            {
                //Seed some users
                var usersFromFile = File.ReadAllText(Path.Combine(jsonPath, "users.json"));
                var users = JsonSerializer.Deserialize<List<User>>(usersFromFile);
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "admin");
                }

            }


        }
    }
}