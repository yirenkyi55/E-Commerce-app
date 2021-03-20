using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<ActionResult<List<ProductForReturnDto>>> GetAllProducts()
        {
            var result = await Mediator.Send(new GetAllProductQuery());
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ProductForReturnDto>> CreateProduct([FromForm] ProductForCreateDto product)
        {
            var result = await Mediator.Send(new CreateProductCommand { Product = product });

            return Ok(result);
        }
    }
}