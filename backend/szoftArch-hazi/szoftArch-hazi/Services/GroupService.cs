using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Data;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public class GroupService : IGroupService
    {
        private ILoggedInUser UserManager { get; }
        private ApplicationDbContext Context { get; }

        public GroupService(ApplicationDbContext context, ILoggedInUser userManager)
        {
            UserManager = userManager;
            Context = context;
        }

        public Task AddGroup(GroupModel group)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<GroupModel>> GetGroupsForCurrentUser()
        {
            throw new NotImplementedException();
        }

        public Task<GroupModel> GetGroup(int groupId)
        {
            throw new NotImplementedException();
        }

        public Task AddMembers(int groupId, IEnumerable<MemberModel> members)
        {
            throw new NotImplementedException();
        }

        public Task SetAdmin(int groupId, MemberModel member)
        {
            throw new NotImplementedException();
        }

        public Task AddCategory(int groupId, CategoryModel category)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CategoryModel>> GetCategories(int groupId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveCategory(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MemberModel>> GetUsersNotInGroup(int groupId)
        {
            throw new NotImplementedException();
        }
    }
}
