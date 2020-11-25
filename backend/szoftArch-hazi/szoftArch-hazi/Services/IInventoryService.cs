using System.Collections.Generic;
using System.Threading.Tasks;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public interface IInventoryService
    {
        Task AddItem(int groupId, ItemModel item);
        Task AddSet(int groupId, SetModel set);
        Task AddItemToSet(int setId, ItemModel item);
        Task RentSetToMember(RentModel set);
        Task RentItemToMember(RentModel item);
        Task RevokeSetFromMember(int setId);
        Task RevokeItemFromMember(int itemId);
        Task<IEnumerable<ItemModel>> ListItemsForGroup(int groupId, CategoryModel term);
        Task<IEnumerable<SetModel>> ListSetsForGroup(int groupId, CategoryModel term);
        Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int memberId, CategoryModel term);
        Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int memberId, CategoryModel term);

    }
}