using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Data;
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
        public Task AddItem(ItemModel item)
        {
            throw new NotImplementedException();
        }

        public Task AddSet(SetModel set)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ItemModel>> ListItemsForGroup(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SetModel>> ListSetsForGroup(int id)
        {
            throw new NotImplementedException();
        }

        public Task RentItemToMember(RentModel model)
        {
            throw new NotImplementedException();
        }

        public Task RentSetToMember(RentModel model)
        {
            throw new NotImplementedException();
        }

        public Task RevokeItemFromMember(RentModel model)
        {
            throw new NotImplementedException();
        }

        public Task RevokeSetFromMember(RentModel model)
        {
            throw new NotImplementedException();
        }
    }
}
