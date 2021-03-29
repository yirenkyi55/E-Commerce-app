using Application.Products.Dtos;
using FluentValidation;

namespace Application.Products.Commands.Validators
{
    public class ProductForUpdateDtoValidator: AbstractValidator<ProductForUpdateDto>
    {
        public ProductForUpdateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(180);
            RuleFor(x => x.ProductBrandId).NotEmpty();
            RuleFor(x => x.ProductTypeId).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.Quantity).NotNull();
        }
    }
}