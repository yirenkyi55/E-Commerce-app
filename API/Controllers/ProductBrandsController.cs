

using System;
using System.Threading.Tasks;
using Application.Brands.Commands;
using Application.Brands.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/productTypes/{id}/brands")]
    public class ProductBrandsController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<ProductBrandForReturnDto>> CreateBrand(Guid id, ProductBrandForCreateDto brand)
        {
            var result = await Mediator.Send(new CreateProductBrandCommand { TypeId = id, Brand = brand });
            return Ok(result);
        }

        [HttpPut("{brandId}")]
        public async Task<ActionResult<ProductBrandForReturnDto>> UpdateBrand(Guid id, Guid brandId, ProductBrandForCreateDto brand)
        {
            var result = await Mediator.Send(new UpdateProductBrandCommand { TypeId = id, BrandId = brandId, Brand = brand });
            return Ok(result);
        }
    }
}