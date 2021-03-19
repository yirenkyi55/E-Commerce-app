namespace Application.Auth.Dtos
{
    public class AuthUserForReturnDto
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string OtherName { get; set; }

        public string LastName { get; set; }

        public string Bio { get; set; }

        public string Photo { get; set; }

        public string AccessToken { get; set; }

    }
}