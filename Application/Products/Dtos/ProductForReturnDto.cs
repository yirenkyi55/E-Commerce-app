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

        public string Picture { get; set; }

        public ProductTypeForReturnDto ProductType { get; set; }

        public ProductBrandForReturnDto ProductBrand { get; set; }
    }
}