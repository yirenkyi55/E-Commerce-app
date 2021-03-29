using System;
using Application.Brands.Dtos;
using Application.Types.Dtos;

namespace Application.Products.Dtos
{
    public class ProductForReturnDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Picture { get; set; }

        public bool ShowOnHomePage { get; set; } = false;

        public ProductTypeForReturnDto ProductType { get; set; }

        public ProductBrandForReturnDto ProductBrand { get; set; }
    }
}