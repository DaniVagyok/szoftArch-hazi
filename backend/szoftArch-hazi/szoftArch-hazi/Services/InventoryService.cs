using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Data;
using szoftArch_hazi.Data.Entities;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public class InventoryService : IInventoryService
    {
        private ILoggedInUser UserManager { get; }
        private ApplicationDbContext Context { get; }

        public InventoryService(ApplicationDbContext context, ILoggedInUser userManager)
        {
            UserManager = userManager;
            Context = context;
        }

        public Task AddItem(int groupId, ItemModel item)
        {
            throw new NotImplementedException();
        }

        public Task AddSet(int groupId, SetModel set)
        {
            throw new NotImplementedException();
        }

        public Task AddItemToSet(int setId, ItemModel item)
        {
            throw new NotImplementedException();
        }

        public Task RentSetToMember(int groupId, RentModel model)
        {
            throw new NotImplementedException();
        }

        public Task RentItemToMember(int groupId, RentModel model)
        {
            throw new NotImplementedException();
        }

        public Task RevokeSetFromMember(int groupId, RentModel model)
        {
            throw new NotImplementedException();
        }

        public Task RevokeItemFromMember(int groupId, RentModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ItemModel>> ListItemsForGroup(int groupId, CategoryModel term)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SetModel>> ListSetsForGroup(int groupId, CategoryModel term)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int memberId, CategoryModel term)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int memberId, CategoryModel term)
        {
            throw new NotImplementedException();
        }
    }
}
