

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Brands.Commands;
using Application.Brands.Dtos;
using Application.Brands.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/productTypes/{id}/brands")]
    public class ProductBrandsController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<ProductBrandForReturnDto>>> GetProductBrands(Guid id)
        {
            var result = await Mediator.Send(new GetProductBrandsQuery { TypeId = id });
            return Ok(result);

        }

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