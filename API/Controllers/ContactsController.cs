using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Contacts.Commands;
using Application.Contacts.Dtos;
using Application.Contacts.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/contacts")]
    public class ContactsController: BaseController
    {
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> CreateContact(ContactForCreateDto contact)
        {
            await Mediator.Send(new CreateContactCommand {Contact = contact});
            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<ContactForReturnDto>>> GetAllContacts()
        {
            var contacts = await Mediator.Send(new GetAllContactsQuery());
            return Ok(contacts);
        }
    }
}