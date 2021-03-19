namespace Application.Common.Models
{
    public class AppSettings
    {
        public string ApiUrl { get; set; }

        public static string MediaFolder { get; } = "Media";

        public static int RefreshTokenLength { get; } = 7;

        public static int ResetPasswordLength { get; } = 20;
    }
}