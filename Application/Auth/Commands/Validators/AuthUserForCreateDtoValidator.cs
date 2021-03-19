using Application.Auth.Dtos;
using FluentValidation;

namespace Application.Auth.Commands.Validators
{
    public class AuthUserForCreateDtoValidator : AbstractValidator<AuthUserForCreateDto>
    {
        public AuthUserForCreateDtoValidator()
        {
            RuleFor(x => x.FirstName).MaximumLength(150).NotEmpty();
            RuleFor(x => x.LastName).MaximumLength(150).NotEmpty();
            RuleFor(x => x.OtherName).MaximumLength(150);
            RuleFor(x => x.Email).MaximumLength(200).NotEmpty().EmailAddress();

        }
    }
}