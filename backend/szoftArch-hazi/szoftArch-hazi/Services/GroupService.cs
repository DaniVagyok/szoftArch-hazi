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
        public Task AddCategory(CategoryModel category)
        {
            throw new NotImplementedException();
        }

        public Task AddGroup()
        {
            throw new NotImplementedException();
        }

        public Task AddMembers(IEnumerable<MemberModel> members)
        {
            throw new NotImplementedException();
        }

        public Task<GroupModel> GetGroupForUser()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MemberModel>> GetUsersNotInGroup()
        {
            throw new NotImplementedException();
        }

        public Task RemoveCategory(int id)
        {
            throw new NotImplementedException();
        }

        public Task SetAdmin(AdminModel admin)
        {
            throw new NotImplementedException();
        }
    }
}
