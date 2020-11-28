using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Models
{
    public class NewItemModel
    {
        public string Name { get; set; }
        public int? CategoryId { get; set; }
        public IFormFile File { get; set; }
    }
}
