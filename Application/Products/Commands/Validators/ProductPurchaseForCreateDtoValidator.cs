using Application.Products.Dtos;
using FluentValidation;

namespace Application.Products.Commands.Validators
{
    public class ProductPurchaseForCreateDtoValidator: AbstractValidator<PurchaseDetailsDto>
    {
        public ProductPurchaseForCreateDtoValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.QuantityPurchased).NotEmpty();
            RuleFor(x => x.PurchasedPrice).NotEmpty();
        }
    }

    public class ShippingInfoValidator : AbstractValidator<ShippingInfoDto>
    {
        public ShippingInfoValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
        }
    }
}