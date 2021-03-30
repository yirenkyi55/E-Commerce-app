using Application.Contacts.Dtos;
using FluentValidation;

namespace Application.Contacts.Commands.Validators
{
    public class ContactForCreateDtoValidator: AbstractValidator<ContactForCreateDto>
    {
        public ContactForCreateDtoValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Message).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}