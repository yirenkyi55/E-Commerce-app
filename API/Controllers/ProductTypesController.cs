using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Types.Commands;
using Application.Types.Dtos;
using Application.Types.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/productTypes")]
    [Authorize(Roles = "admin")]
    public class ProductTypesController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductTypeForReturnDto>>> GetProductTypes()
        {
            var result = await Mediator.Send(new GetAllProductTypesQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductTypeForReturnDto>> GetProductType(Guid id)
        {
            var result = await Mediator.Send(new GetProductTypeQuery { TypeId = id });
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ProductTypeForReturnDto>> CreateProductType(ProductTypeForCreateDto productType)
        {
            var result = await Mediator.Send(new CreateProductTypeCommand { ProductType = productType });
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductTypeForReturnDto>> UpdateProductType(Guid id, ProductTypeForCreateDto productType)
        {
            var result = await Mediator.Send(new UpdateProductTypeCommand { TypeId = id, ProductType = productType });
            return Ok(result);
        }
    }
}