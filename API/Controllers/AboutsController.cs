using System.Threading.Tasks;
using Application.Abouts.Commands;
using Application.Abouts.Dtos;
using Application.Abouts.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/abouts")]
    public class AboutsController: BaseController
    {
        [HttpGet]
        public async Task<ActionResult<AboutForReturnDto>> GetAbout()
        {
            var about = await Mediator.Send(new GetAboutRequest());
            return Ok(about);
        }

        [HttpPost]
        public async Task<ActionResult<AboutForReturnDto>> CreateAbout(AboutForCreateDto about)
        {
            var result = await Mediator.Send(new CreateAboutCommand {AboutForCreate = about});
            return Ok(result);
        }
    }
}