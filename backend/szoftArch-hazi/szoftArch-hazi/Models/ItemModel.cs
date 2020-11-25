using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Models
{
    public class ItemModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string ThumbnailUrl { get; set; }
        public string CategoryName { get; set; }
    }
}
