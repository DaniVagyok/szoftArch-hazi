using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Models
{
    public class GroupModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? MemberId { get; set; }
        public bool? IsAdminInGroup { get; set; }
    }
}
