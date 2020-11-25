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
        Task AddMember(int groupId, MemberModel member);
        Task SetAdmin(int groupId, MemberModel member);
        Task AddCategory(int groupId, CategoryModel category);
        Task<IEnumerable<CategoryModel>> GetCategories(int groupId);
        Task<IEnumerable<MemberModel>> GetUsersInGroup(int groupId);
        Task<IEnumerable<UserModel>> GetUsersNotInGroup(int groupId);
    }
}