using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Data.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ThumbnailUrl { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public int? SetId { get; set; }
        public Set Set { get; set; }
        public int? MemberId { get; set; }
        public Member Member { get; set; }
        public int? CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
