using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces
{
    public interface IFileService
    {

        Task<string> SaveFileAsync(IFormFile file, string folderName);

        string GetFullFilePath(string fileName, string folderName);

        bool DeleteFile(string fileName, string folderName);
    }
}