using System;

namespace Application.Products.Dtos
{
    public class ProductPurchaseForCreateDto
    {
        public Guid ProductId { get; set; }

        public int QuantityPurchased { get; set; }

        public decimal PurchasedPrice { get; set; }

    }
}