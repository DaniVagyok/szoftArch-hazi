﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Services;

namespace szoftArch_hazi.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/group")]
    [ApiController]
    [Authorize]
    public class GroupController : ControllerBase
    {
        public IGroupService GroupService { get; }
        public GroupController(IGroupService service)
        {
            GroupService = service;
        }
    }
}
