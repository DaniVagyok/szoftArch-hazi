using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Models;
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
        [HttpPost]
        public async Task AddGroup(GroupModel group)
        {
            await GroupService.AddGroup(group);
        }
        [HttpGet("/groups")]
        public async Task<IEnumerable<GroupModel>> GetGroupsForCurrentUser()
        {
            return await GroupService.GetGroupsForCurrentUser();
        }
        [HttpGet("{groupId}")]
        public async Task<GroupModel> GetGroup(int groupId)
        {
            return await GroupService.GetGroup(groupId);
        }
        [HttpGet]
        public async Task<GroupModel> GetGroup()
        {
            return await GroupService.GetGroup();
        }
        [HttpPut("{groupId}/member")]
        public async Task AddMember(int groupId, MemberModel member)
        {
            await GroupService.AddMember(groupId,member);
        }
        [HttpPut("{groupId}/admin")]
        public async Task SetAdmin(int groupId, MemberModel member)
        {
            await GroupService.SetAdmin(groupId, member);
        }
        [HttpPost("{groupId}/category")]
        public async Task AddCategory(int groupId, CategoryModel category)
        {
            await GroupService.AddCategory(groupId, category);
        }
        [HttpGet("{groupId}/category")]
        public async Task<IEnumerable<CategoryModel>> GetCategories(int groupId, string term)
        {
            return await GroupService.GetCategories(groupId, term);
        }
        [HttpGet("{groupId}/user/group")]
        public async Task<IEnumerable<MemberModel>> GetUsersInGroup(int groupId, string term)
        {
            return await GroupService.GetUsersInGroup(groupId, term);
        }
        [HttpGet("{groupId}/user/nogroup")]
        public async Task<IEnumerable<UserModel>> GetUsersNotInGroup(int groupId, string term)
        {
            return await GroupService.GetUsersNotInGroup(groupId, term);
        }
        [HttpGet("{groupId}/user/any")]
        public async Task<IEnumerable<UserModel>> GetUsersNotInAnyGroup(int groupId, string term)
        {
            return await GroupService.GetUsersNotInAnyGroup(groupId, term);
        }
    }
}
