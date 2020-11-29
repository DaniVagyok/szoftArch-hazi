using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Data.Entities
{
    public class Set
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public int? MemberId { get; set; }
        public Member Member { get; set; }
        public IEnumerable<Item> Items { get; set; }
    }
}
