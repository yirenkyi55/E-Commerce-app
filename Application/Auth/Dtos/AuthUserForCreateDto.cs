namespace Application.Auth.Dtos
{
    public class AuthUserForCreateDto
    {
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string OtherName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }
    }
}