using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.Products.Commands;
using Application.Products.Dtos;
using Application.Products.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v{version:apiVersion}/products")]
    public class ProductsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<PaginationResult<ProductForReturnDto>>> GetAllProducts([FromQuery] ProductParams productParams)
        {
            var result = await Mediator.Send(new GetAllProductQuery { Params = productParams });
            return Ok(result);
        }

        [HttpGet("{id}")]
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
        public async Task<ActionResult<ProductForReturnDto>> UpdateProduct(Guid id, [FromForm] ProductForCreateDto productForCreate)
        {
            var result = await Mediator.Send(new UpdateProductCommand { ProductId = id, ProductForCreate = productForCreate });
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