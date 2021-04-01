using System.Collections.Generic;

namespace Application.Admins.Dtos
{
    public class AdminUserForReturnDto
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string OtherName { get; set; }

        public string LastName { get; set; }

        public string Bio { get; set; }

        public List<string> Role { get; set; }
    }
}