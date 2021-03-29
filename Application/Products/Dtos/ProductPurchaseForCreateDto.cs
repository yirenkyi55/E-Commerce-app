using System;

namespace Application.Products.Dtos
{
    public class ProductForPurchaseDto
    {
        public Guid ProductId { get; set; }

        public int Quantity { get; set; }

        public decimal PurchasedPrice { get; set; }
    }
}