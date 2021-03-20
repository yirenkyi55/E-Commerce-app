using Application.Types.Dtos;
using FluentValidation;

namespace Application.Types.Commands.Validators
{
    public class ProductTypeForCreateDtoValidator : AbstractValidator<ProductTypeForCreateDto>
    {
        public ProductTypeForCreateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
        }
    }
}