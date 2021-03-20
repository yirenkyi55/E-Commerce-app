using Application.Products.Dtos;
using FluentValidation;

namespace Application.Products.Commands.Validators
{
    public class ProductForCreateDtoValidator : AbstractValidator<ProductForCreateDto>
    {
        public ProductForCreateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(180);
            RuleFor(x => x.Photo).NotEmpty();
            RuleFor(x => x.ProductBrandId).NotEmpty();
            RuleFor(x => x.ProductTypeId).NotEmpty();
        }
    }
}