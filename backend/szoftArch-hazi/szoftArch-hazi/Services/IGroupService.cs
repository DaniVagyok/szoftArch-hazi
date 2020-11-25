using System.Collections.Generic;
using System.Threading.Tasks;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public interface IGroupService
    {
        Task AddGroup(GroupModel group);
        Task<IEnumerable<GroupModel>> GetGroupsForCurrentUser();
        Task<GroupModel> GetGroup(int groupId);
        Task AddMembers(int groupId, IEnumerable<MemberModel> members);
        Task SetAdmin(int groupId, MemberModel member);
        Task AddCategory(int groupId, CategoryModel category);
        Task<IEnumerable<CategoryModel>> GetCategories(int groupId);
        Task RemoveCategory(int id);
        Task<IEnumerable<MemberModel>> GetUsersNotInGroup(int groupId);
    }
}