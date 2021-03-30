using Application.Abouts.Dtos;
using FluentValidation;

namespace Application.Abouts.Commands.Validators
{
    public class AboutForCreateDtoValidator: AbstractValidator<AboutForCreateDto>
    {
        public AboutForCreateDtoValidator()
        {
            RuleFor(x => x.AboutTitle).NotEmpty();
            RuleFor(x => x.AboutMessage).NotEmpty();
            RuleFor(x => x.NameOfCompany).NotEmpty();
        }
    }
}