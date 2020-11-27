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
        Task<GroupModel> GetGroup();
        Task AddMember(int groupId, MemberModel member);
        Task SetAdmin(int groupId, MemberModel member);
        Task AddCategory(int groupId, CategoryModel category);
        Task<IEnumerable<CategoryModel>> GetCategories(int groupId, string term);
        Task<IEnumerable<MemberModel>> GetUsersInGroup(int groupId, string term);
        Task<IEnumerable<UserModel>> GetUsersNotInGroup(int groupId, string term);
        Task<IEnumerable<UserModel>> GetUsersNotInAnyGroup(int groupId, string term);
    }
}