using System.Collections.Generic;
using System.Threading.Tasks;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public interface IInventoryService
    {
        Task AddItem(int groupId, NewItemModel item);
        Task AddSet(int groupId, NewSetModel set);
        Task AddItemToSet(int setId, ItemModel item);
        Task<DownloadModel> GetImage(int id);
        Task RentSetToMember(RentModel set);
        Task RentItemToMember(RentModel item);
        Task RevokeSetFromMember(int setId);
        Task RevokeItemFromMember(int itemId);
        Task<IEnumerable<ItemModel>> ListItemsForGroup(int groupId, string term);
        Task<IEnumerable<SetModel>> ListSetsForGroup(int groupId, string term);
        Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int memberId, string term);
        Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int memberId, string term);
    }
}