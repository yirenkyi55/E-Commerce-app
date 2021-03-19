using System;
using System.IO;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly AppSettings _settings;

        public FileService(
            IWebHostEnvironment hostEnvironment,
            IOptions<AppSettings> options
            )
        {
            _hostEnvironment = hostEnvironment;
            _settings = options.Value;
        }


        public async Task<string> SaveFileAsync(IFormFile file, string folderName)
        {
            try
            {
                await using var memoryStream = new MemoryStream();

                await file.CopyToAsync(memoryStream);

                var fileInByte = memoryStream.ToArray();

                var fileExtension = Path.GetExtension(file.FileName);

                var folderLocation = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", folderName);

                if (!Directory.Exists(folderLocation))
                {
                    Directory.CreateDirectory(folderLocation);
                }

                var fileName = $"{Guid.NewGuid()}{fileExtension}";

                var filePath = Path.Combine(folderLocation, fileName);

                await File.WriteAllBytesAsync(filePath, fileInByte);

                return fileName;
            }
            catch (System.Exception)
            {

                return null;
            }
        }

        public bool DeleteFile(string fileName, string folderName)
        {
            var filePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", folderName, fileName);

            if (!File.Exists(filePath))
            {
                return false;
            }

            File.Delete(filePath);

            return true;
        }

        public string GetFullFilePath(string fileName, string folderName)
        {
            var apiUrl = _settings.ApiUrl;

            return Path.Combine(apiUrl, folderName, fileName).Replace("\\", "/");
        }
    }
}