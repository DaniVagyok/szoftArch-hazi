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
        Task RentSetToMember(int groupId, RentModel model);
        Task RentItemToMember(int groupId, RentModel model);
        Task RevokeSetFromMember(int groupId, RentModel model);
        Task RevokeItemFromMember(int groupId, RentModel model);
        Task<IEnumerable<ItemModel>> ListItemsForGroup(int groupId, CategoryModel term);
        Task<IEnumerable<SetModel>> ListSetsForGroup(int groupId, CategoryModel term);
        Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int memberId, CategoryModel term);
        Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int memberId, CategoryModel term);

    }
}