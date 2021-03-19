using System;

namespace Application.Products.Dtos
{
    public class ProductForReturnDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string Picture { get; set; }

        public string ProductType { get; set; }

        public string ProductBrand { get; set; }
    }
}