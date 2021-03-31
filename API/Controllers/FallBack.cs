using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [AllowAnonymous]
    public class Fallback : Controller
    {
        private readonly ILogger<Fallback> _logger;
        private readonly IWebHostEnvironment _hostEnvironment;

        public Fallback(ILogger<Fallback> logger, IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            _logger = logger;
        }
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(_hostEnvironment.ContentRootPath,"wwwroot", "index.html"), "text/HTML");
        }
    }
}