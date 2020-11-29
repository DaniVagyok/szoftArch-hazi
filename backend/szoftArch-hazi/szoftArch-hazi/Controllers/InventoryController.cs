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
    [Route("api/inventory")]
    [ApiController]
    [Authorize]
    public class InventoryController : ControllerBase
    {
        public IInventoryService InventoryService { get; }
        public InventoryController(IInventoryService service)
        {
            InventoryService = service;
        }

        [Consumes("multipart/form-data")]
        [HttpPost("{groupId}/item")]
        public async Task AddItem(int groupId, [FromForm] NewItemModel item)
        {
            await InventoryService.AddItem(groupId, item);
        }
        [HttpPost("{groupId}/set")]
        public async Task AddSet(int groupId, NewSetModel set)
        {
            await InventoryService.AddSet(groupId, set);

        }
        [HttpPut("{setId}/item")]
        public async Task AddItemToSet(int setId, ItemModel item)
        {
            await InventoryService.AddItemToSet(setId, item);
        }
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetImage(int id)
        {
            var model = await InventoryService.GetImage(id);
            return File(model.Content, model.ContentType, model.FileName);
        }
        [HttpPost("rent/set")]
        public async Task RentSetToMember(RentModel set)
        {
            await InventoryService.RentSetToMember(set);
        }
        [HttpPost("rent/item")]
        public async Task RentItemToMember(RentModel item)
        {
            await InventoryService.RentItemToMember(item);
        }
        [HttpPost("revoke/set")]
        public async Task RevokeSetFromMember(int setId)
        {
            await InventoryService.RevokeSetFromMember(setId);
        }
        [HttpPost("revoke/item")]
        public async Task RevokeItemFromMember(int itemId)
        {
            await InventoryService.RevokeItemFromMember(itemId);
        }
        [HttpGet("{groupId}/item")]
        public async Task<IEnumerable<ItemModel>> ListItemsForGroup(int groupId, string term)
        {
            return await InventoryService.ListItemsForGroup(groupId, term);
        }
        [HttpGet("{groupId}/set")]
        public async Task<IEnumerable<SetModel>> ListSetsForGroup(int groupId, string term)
        {
            return await InventoryService.ListSetsForGroup(groupId, term);
        }
        [HttpGet("{memberId}/rent/item")]
        public async Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int memberId, string term)
        {
            return await InventoryService.ListRentedItemsForMember(memberId, term);
        }
        [HttpGet("{memberId}/rent/set")]
        public async Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int memberId, string term)
        {
            return await InventoryService.ListRentedSetsForMemmber(memberId, term);
        }
    }
}
