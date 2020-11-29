using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Data;
using szoftArch_hazi.Data.Entities;
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

        public async Task AddGroup(GroupModel group)
        {
            var groupEntity = new Group
            {
                Name = group.Name,
            };
            var entity = Context.Groups.Add(groupEntity);
            var memberEntity = new Member
            {
                UserId = UserManager.GetUserId(),
                Group = entity.Entity,
                IsAdmin = true
            };
            Context.Members.Add(memberEntity);
            await Context.SaveChangesAsync();
        }

        public async Task<IEnumerable<GroupModel>> GetGroupsForCurrentUser()
        {
            return await Context.Groups.Where(g => g.Members.Any(m => m.UserId == UserManager.GetUserId()))
                .Select(g=> new GroupModel { 
                    Id=g.Id,
                    Name = g.Name
                }).ToListAsync();
        }

        public async Task<GroupModel> GetGroup(int groupId)
        {
            return await Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId())
                .Select(m=> new GroupModel {
                    Id = m.Group.Id,
                    Name = m.Group.Name,
                    MemberId = m.Id,
                    IsAdminInGroup = m.IsAdmin
                }).FirstOrDefaultAsync();
        }
        public async Task<GroupModel> GetGroup()
        {
            return await Context.Members.Where(m =>m.UserId == UserManager.GetUserId())
                .Select(m => new GroupModel
                {
                    Id = m.Group.Id,
                    Name = m.Group.Name,
                    MemberId = m.Id,
                    IsAdminInGroup = m.IsAdmin
                }).FirstOrDefaultAsync();
        }

        public async Task AddMember(int groupId, MemberModel member)
        {
            if (Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                var memberEntity = new Member
                {
                    GroupId = groupId,
                    UserId = member.UserId,
                    IsAdmin = false
                };
                Context.Members.Add(memberEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task SetAdmin(int groupId, MemberModel member)
        {
            if (Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                var memberEntity = await Context.Members.FirstOrDefaultAsync(m => m.Id == member.Id);
                memberEntity.IsAdmin = member.IsAdmin ?? false;
                Context.Members.Update(memberEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task AddCategory(int groupId, CategoryModel category)
        {
            if (Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                var categoryEntity = new Category
                {
                    Name = category.Name,
                    GroupId = groupId
                };
                Context.Categories.Add(categoryEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<CategoryModel>> GetCategories(int groupId, string term)
        {
            return await Context.Categories.Where(c => c.GroupId == groupId && (String.IsNullOrEmpty(term) || c.Name.Contains(term)))
                    .Select(c => new CategoryModel
                    {
                        Id = c.Id,
                        Name = c.Name
                    }).ToListAsync();
        }

        public async Task<IEnumerable<UserModel>> GetUsersNotInGroup(int groupId, string term)
        {
            if (Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                return await Context.Users.Where(u => !u.Memberships.Any() && (String.IsNullOrEmpty(term) || u.UserName.Contains(term)))
                    .Select(u => new UserModel
                    {
                        Id = u.Id,
                        UserName = u.UserName
                    }).ToListAsync();
            }
            return null;
        }

        public async Task<IEnumerable<MemberModel>> GetUsersInGroup(int groupId, string term)
        {
            if (Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                return await Context.Members.Where(m => m.GroupId == groupId && (String.IsNullOrEmpty(term) || m.User.UserName.Contains(term)))
                    .Select(m => new MemberModel { 
                        Id = m.Id,
                        UserId = m.UserId,
                        GroupId = m.GroupId,
                        UserName = m.User.UserName,
                        IsAdmin = m.IsAdmin
                    }).ToListAsync();
            }
            return null;
        }

        public async Task<IEnumerable<UserModel>> GetUsersNotInAnyGroup(int groupId, string term)
        {
            if (Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                return await Context.Users.Where(u => !u.Memberships.Any(m => m.GroupId == groupId) && (String.IsNullOrEmpty(term) || u.UserName.Contains(term)))
                    .Select(u => new UserModel
                    {
                        Id = u.Id,
                        UserName = u.UserName
                    }).ToListAsync();
            }
            return null;
        }
    }
}
