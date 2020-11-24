using System.Collections.Generic;
using System.Threading.Tasks;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public interface IGroupService
    {
        Task AddGroup();
        Task<GroupModel> GetGroupForUser(); // 1 user 1 group így
        Task AddMembers(IEnumerable<MemberModel> members);
        Task SetAdmin(AdminModel admin);
        Task AddCategory(CategoryModel category);
        Task RemoveCategory(int id);
        Task<IEnumerable<MemberModel>> GetUsersNotInGroup(); // 1 user 1 group így
    }
}