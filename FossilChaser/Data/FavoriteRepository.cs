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
    public class FavoriteRepository
    {
        readonly string _connectionString;

        public FavoriteRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }
        public Favorite AddFavorite(int userId, int fossilId, int formationId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newFavorite = db.QueryFirstOrDefault<Favorite>(
                                                                @"insert into Favorite (userId, fossilId, formationId)
                                                                Output inserted.*
                                                                values (@userId, @fossilId, @formationId)
                                                                select * from Favorite",
                                                                new { userId, fossilId, formationId });

                if (newFavorite != null)
                {
                    return newFavorite;
                }
            }
            throw new System.Exception("No new favorite found.");
        }

        public IEnumerable<Favorite> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var favorites = db.Query<Favorite>("select * from Favorite").ToList();

                return favorites;
            }
        }

        public Favorite GetFavorite(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var singleFavorite = db.QueryFirstOrDefault<Favorite>(@"select *
                                                                    from Favorite
                                                                    where id = @id",
                                                                    new { id });
                return singleFavorite;
            }
        }


        public Favorite UpdateFavorite(Favorite singleFavorite)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateFavorite = db.QueryFirstOrDefault<Favorite>(@"update Favorite
                                        set userId = @userId,
                                            fossilId = @fossilId,
                                            formationId = @formationId,
                                            output inserted.*
                                            where id = @id",
                                                            new
                                                            {
                                                                userId = singleFavorite.UserId,
                                                                fossilId = singleFavorite.FossilId,
                                                                formationId = singleFavorite.FormationId,
                                                            });
                return updateFavorite;
            }
            throw new System.Exception("Could not update favorite.");
        }

        public Favorite DeleteFavorite(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedFavorite = db.QueryFirstOrDefault<Favorite>(@"delete
                                                                       from Favorite
                                                                       where id = @id",
                                                                       new { id });
                return deletedFavorite;
            }
        }
    }
}
