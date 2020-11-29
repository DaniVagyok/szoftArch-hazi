using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Data;
using szoftArch_hazi.Data.Entities;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public class InventoryService : IInventoryService
    {
        private ILoggedInUser UserManager { get; }
        private ApplicationDbContext Context { get; }
        private IWebHostEnvironment Env { get; }

        public InventoryService(ApplicationDbContext context, ILoggedInUser userManager, IWebHostEnvironment env)
        {
            UserManager = userManager;
            Context = context;
            Env = env;
        }

        public async Task AddItem(int groupId, NewItemModel item)
        {
            if (Context.Members.Where(m=>m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                var itemEntity = new Item
                {
                    Name = item.Name,
                    ThumbnailUrl = SaveImage(item),
                    GroupId = groupId,
                    CategoryId = item.CategoryId
                };
                Context.Items.Add(itemEntity);
                await Context.SaveChangesAsync();
            }
        }
        public async Task<DownloadModel> GetImage(int id)
        {
            var file = await Context.Items.SingleOrDefaultAsync(f => f.Id == id);
            var fileInfo = new FileInfo(file.ThumbnailUrl);

            return new DownloadModel
            {
                Content = File.ReadAllBytes(fileInfo.FullName),
                FileName = fileInfo.Name,
                ContentType = "image/png"
            };
        }
        public async Task AddSet(int groupId, NewSetModel set)
        {
            if (Context.Members.Where(m => m.GroupId == groupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                var newEntity = new Set
                {
                    Name = set.Name,
                    GroupId = groupId
                };
                Context.Sets.Add(newEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task AddItemToSet(int setId, ItemModel item)
        {
            var itemEntity = Context.Items.SingleOrDefault(i => i.Id == item.Id);
            if (itemEntity == null)
            {
                return;
            }
            if (Context.Members.Where(m => m.GroupId == itemEntity.GroupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                if (itemEntity != null)
                {
                    itemEntity.SetId = setId;
                }
                Context.Items.Update(itemEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task RentSetToMember(RentModel set)
        {
            var setEntity = await Context.Sets.SingleOrDefaultAsync(s => s.Id == set.Id);
            if (setEntity == null)
            {
                return;
            }
            if (Context.Members.Where(m => m.GroupId == setEntity.GroupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                if (setEntity != null)
                {
                    setEntity.MemberId = set.MemberId;
                }
                Context.Sets.Update(setEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task RentItemToMember(RentModel item)
        {
            var itemEntity = await Context.Items.SingleOrDefaultAsync(s => s.Id == item.Id);
            if (itemEntity == null)
            {
                return;
            }
            if (Context.Members.Where(m => m.GroupId == itemEntity.GroupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                if (itemEntity != null)
                {
                    itemEntity.MemberId = item.MemberId;
                }
                Context.Items.Update(itemEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task RevokeSetFromMember(int setId)
        {
            var setEntity = await Context.Sets.SingleOrDefaultAsync(s => s.Id == setId);
            if (setEntity == null)
            {
                return;
            }
            if (Context.Members.Where(m => m.GroupId == setEntity.GroupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                if (setEntity != null)
                {
                    setEntity.MemberId = null;
                }
                Context.Sets.Update(setEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task RevokeItemFromMember(int itemId)
        {
            var itemEntity = await Context.Items.SingleOrDefaultAsync(s => s.Id == itemId);
            if (itemEntity == null)
            {
                return;
            }
            if (Context.Members.Where(m => m.GroupId == itemEntity.GroupId && m.UserId == UserManager.GetUserId() && m.IsAdmin).SingleOrDefault() != null)
            {
                if (itemEntity != null)
                {
                    itemEntity.MemberId = null;
                }
                Context.Items.Update(itemEntity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<ItemModel>> ListItemsForGroup(int groupId, string term)
        {
            return await Context.Items.Where(i=>i.GroupId == groupId && (String.IsNullOrEmpty(term) || i.Name.Contains(term)))
                .Select(i=> new ItemModel { 
                    Id = i.Id,
                    Name = i.Name,
                    OwnerName = i.Member != null ? i.Member.User.UserName : "",
                    CategoryName = i.Category != null ? i.Category.Name : ""
                }).ToListAsync();
        }

        public async Task<IEnumerable<SetModel>> ListSetsForGroup(int groupId, string term)
        {
            return await Context.Sets.Where(i => i.GroupId == groupId && (String.IsNullOrEmpty(term) || i.Name.Contains(term)))
                .Select(s => new SetModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    OwnerName = s.Member != null ? s.Member.User.UserName : "",
                    Items = s.Items.Select(i=> new ItemModel
                    {
                        Id = i.Id,
                        Name = i.Name,
                        OwnerName = i.Member != null ? i.Member.User.UserName : "",
                        CategoryName = i.Category != null ? i.Category.Name : ""
                    })
                }).ToListAsync();
        }

        public async Task<IEnumerable<ItemModel>> ListRentedItemsForMember(int memberId, string term)
        {
            return await Context.Items.Where(i => i.MemberId == memberId && (String.IsNullOrEmpty(term) || i.Name.Contains(term)))
                .Select(i => new ItemModel
                {
                    Id = i.Id,
                    Name = i.Name,
                    OwnerName = i.Member != null ? i.Member.User.UserName : "",
                    CategoryName = i.Category != null ? i.Category.Name : ""
                }).ToListAsync();
        }

        public async Task<IEnumerable<SetModel>> ListRentedSetsForMemmber(int memberId, string term)
        {
            return await Context.Sets.Where(i => i.MemberId == memberId && (String.IsNullOrEmpty(term) || i.Name.Contains(term)))
                .Select(s => new SetModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    Items = s.Items.Select(i => new ItemModel
                    {
                        Id = i.Id,
                        Name = i.Name,
                        OwnerName = i.Member != null ? i.Member.User.UserName : "",
                        CategoryName = i.Category != null ? i.Category.Name : ""
                    })
                }).ToListAsync();
        }
        private string SaveImage(NewItemModel newFile)
        {
            var subFolder = @"files\images";
            string path = Path.Combine(Env.ContentRootPath, subFolder);

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            var fileName = $"{newFile.Name}_{Context.Items.Count()}.png";
            string filePath = Path.Combine(path, fileName);

            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                newFile.File.CopyTo(ms);
                fileBytes = ms.ToArray();
                File.WriteAllBytes(filePath, fileBytes);
            }
            return filePath;
        }
    }
}
