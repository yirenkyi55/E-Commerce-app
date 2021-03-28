using System;
using Application.Common.Models;

namespace Application.Products.Queries
{
    public class ProductParams : BaseParams
    {
        public Guid? TypdId { get; set; }

        public Guid? BrandId { get; set; }

        public bool HomePage { get; set; }

        private string _search;
        public string Search
        {
            get { return _search; }
            set { _search = value; }
        }

    }
}