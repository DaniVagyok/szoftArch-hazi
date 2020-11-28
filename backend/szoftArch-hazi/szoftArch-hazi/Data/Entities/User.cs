﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace szoftArch_hazi.Data.Entities
{
    public class User : IdentityUser
    {
        public IEnumerable<Member> Memberships { get; set; }
    }
}