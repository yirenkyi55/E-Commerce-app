using Application.Products.Dtos;
using FluentValidation;

namespace Application.Products.Commands.Validators
{
    public class ProductPurchaseForCreateDtoValidator: AbstractValidator<ProductPurchaseForCreateDto>
    {
        public ProductPurchaseForCreateDtoValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.QuantityPurchased).NotEmpty();
            RuleFor(x => x.PurchasedPrice).NotEmpty();
        }
    }
}