using System;
using Microsoft.AspNetCore.Identity;

namespace Domain.Identity
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }

        public string OtherName { get; set; }

        public string LastName { get; set; }

        public string Photo { get; set; }

        public string RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiry { get; set; }

        public DateTime? PasswordResetTokenExpiry { get; set; }
    }
}