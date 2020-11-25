using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Models
{
    public class MemberModel
    {
        public int? Id { get; set; }
        public int GroupId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public bool IsAdmin { get; set; }
    }
}
