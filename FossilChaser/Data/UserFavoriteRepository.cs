using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FossilChaser.Models;
using Microsoft.Extensions.Options;

namespace FossilChaser.Data
{
    public class UserFavoriteRepository
    {
        readonly string _connectionString;

        public UserFavoriteRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }
        public UserFavorite AddUserFavorite (int userId, int favoriteId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var joinUserWithFavorite = db.QueryFirstOrDefault<UserFavorite>(@"insert into [UserFavorite](userId, favoriteId)
                                                                                        Output inserted.*
                                                                                        Values (@userId, @favoriteId)",
                                                                                        new { userId, favoriteId });

                if (joinUserWithFavorite != null)
                {
                    return joinUserWithFavorite;
                }
            }

            throw new Exception("User could not add a favorite");
        }

        public IEnumerable<UserFavorite> GetAllUserFavorites()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var getUserFavorite = db.Query<UserFavorite>(@"select * from customerProduct").ToList();
                return getUserFavorite;
            }

        }

        public UserFavorite GetSingleUserFavorite(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var getSingleFavoriteUser = db.QueryFirstOrDefault<UserFavorite>(@"select * from userFavorite 
                                                                                        where id = @id",
                                                                                        new { id });
                return getSingleFavoriteUser;
            }
        }

        public UserFavorite UpdateCustomerProduct(UserFavorite UserFavoriteInfo)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateUserFavorite = db.QueryFirstOrDefault<UserFavorite>(@"update UserFavorite
                                                                                    Set userId = @userId,
                                                                                        favoriteId = @favoriteId
                                                                                        output inserted.*
                                                                                        where id = @id",
                                                                                        new { id = UserFavoriteInfo.Id, userId = UserFavoriteInfo.UserId, favoriteId = UserFavoriteInfo.FavoriteId });
                return updateUserFavorite;
            }
            throw new Exception("Could not update user favorite.");
        }

        public IEnumerable<UserFavorite> GetUserFavorite(string userUid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var getSingleUserFavorite = db.Query<UserFavorite>(@"select * From UserFavorite uf
                                                                                        Join [User] u on uf.UserId = u.id
                                                                                        join Favorite f on uf.FavoriteId = f.id
                                                                                        where u.userUid = @userUid",
                                                                                        new { userUid }).ToList();
                return getSingleUserFavorite;
            }
        }
    }
}
