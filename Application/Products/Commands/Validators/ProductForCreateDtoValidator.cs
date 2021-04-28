using Application.Products.Dtos;
using FluentValidation;

namespace Application.Products.Commands.Validators
{
    public class ProductForCreateDtoValidator : AbstractValidator<ProductForCreateDto>
    {
        public ProductForCreateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty();
            //RuleFor(x => x.Photo ).NotEmpty();
            RuleFor(x => x.ProductBrandId).NotEmpty();
            RuleFor(x => x.ProductTypeId).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.Quantity).NotNull();
        }
    }
}