using System.IO;

namespace Application.Common.Static
{
    public class FileResolver
    {
        public static string GetFullFilePath(string folderName, string fileName)
        {
            if (folderName == null || fileName == null) return null;

            var currentUrl = DependencyInjection.StaticConfig["AppSettings:ApiUrl"];
            //Generate the access patch
            return Path.Combine(currentUrl, folderName, fileName).Replace("\\", "/");
            
        }
    }
}