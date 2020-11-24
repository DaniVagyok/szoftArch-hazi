using System.Collections.Generic;
using System.Threading.Tasks;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public interface IInventoryService
    {
        Task AddItem(ItemModel item);
        Task AddSet(SetModel set);
        Task RentSetToMember(RentModel model);
        Task RentItemToMember(RentModel model);
        Task RevokeSetFromMember(RentModel model);
        Task RevokeItemFromMember(RentModel model);
        Task<IEnumerable<ItemModel>> ListItemsForGroup(int id);
        Task<IEnumerable<SetModel>> ListSetsForGroup(int id);
        Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int id);
        Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int id);

    }
}