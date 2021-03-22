using Application.Auth.Dtos;
using FluentValidation;

namespace Application.Auth.Commands.Validators
{
    public class RefreshTokenDtoValidator : AbstractValidator<RefreshTokenDto>
    {
        public RefreshTokenDtoValidator()
        {
            RuleFor(x => x.Token).NotEmpty();
        }
    }
}