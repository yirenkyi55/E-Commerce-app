using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Products.Commands;
using Application.Products.Dtos;
using Application.Products.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/products")]
    [Authorize(Roles = "admin")]
    public class ProductsController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<PaginationResult<ProductForReturnDto>>> GetAllProducts([FromQuery] ProductParams productParams)
        {
            var result = await Mediator.Send(new GetAllProductQuery { Params = productParams });
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<List<ProductForReturnDto>>> GetProduct(Guid id)
        {
            var result = await Mediator.Send(new GetProductQuery { ProductId = id });
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ProductForReturnDto>> CreateProduct([FromForm] ProductForCreateDto product)
        {
            var result = await Mediator.Send(new CreateProductCommand { Product = product });

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductForReturnDto>> UpdateProduct(Guid id, [FromForm] ProductForUpdateDto productForUpdate)
        {
            var result = await Mediator.Send(new UpdateProductCommand { ProductId = id, ProductForUpdate = productForUpdate });
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(Guid id)
        {
            var result = await Mediator.Send(new DeleteProductCommand { ProductId = id });
            return NoContent();
        }
    }
}