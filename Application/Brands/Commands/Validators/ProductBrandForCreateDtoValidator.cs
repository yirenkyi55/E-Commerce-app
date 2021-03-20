using Application.Brands.Dtos;
using FluentValidation;

namespace Application.Brands.Commands.Validators
{
    public class ProductBrandForCreateDtoValidator : AbstractValidator<ProductBrandForCreateDto>
    {
        public ProductBrandForCreateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        }
    }
}