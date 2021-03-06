﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FossilChaser.Models;
using Microsoft.Extensions.Options;

namespace FossilChaser.Data
{
    public class FossilFormationRepository
    {
        readonly string _connectionString;

        public FossilFormationRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public FossilFormation AddFossilFormation(int userId, int fossilId, int formationId, int favoriteId)
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    var newFossilFormation = db.QueryFirstOrDefault<FossilFormation>(
                                                                                    @"insert into FossilFormation (userId, fossilId, formationId, favoriteId)
                                                                                    Output inserted.*
                                                                                    values (@userId, @fossilId, @formationId, @favoriteId)
                                                                                    select * from FossilFormation",
                                                                                    new { userId, fossilId, formationId, favoriteId });

                    if (newFossilFormation != null)
                    {
                        return newFossilFormation;
                    }
                }
                throw new System.Exception("No new fossil formation found.");
            }

            public IEnumerable<FossilFormation> GetAll()
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    var fossilFormation = db.Query<FossilFormation>("select * from Fossil Formation").ToList();

                    return fossilFormation;
                }
            }

            public FossilFormation GetFossilFormation(int id)
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    var fossilFormation = db.QueryFirstOrDefault<FossilFormation>(@"select *
                                                                                    from FossilFormation
                                                                                    where id = @id",
                                                                                    new { id });
                    return fossilFormation;
                }
            }


            public FossilFormation UpdateFossilFormation(FossilFormation fossilFormation)
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    var updateFossilFormation = db.QueryFirstOrDefault<FossilFormation>(@"update FossilFormation
                                                                                           set userId = @userId,
                                                                                           fossilId = @fossilId,
                                                                                           formationId = @formationId,
                                                                                           output inserted.*
                                                                                           where id = @id",
                                                                                           new
                                                                                           {
                                                                                               id = fossilFormation.Id,
                                                                                               userId = fossilFormation.UserId,
                                                                                               fossilId = fossilFormation.FossilId,
                                                                                               formationId = fossilFormation.FormationId,
                                                                                               favoriteId = fossilFormation.FavoriteId
                                                                                           });
                    return updateFossilFormation;
                }
                throw new System.Exception("Could not update fossil formation.");
            }

            public FossilFormation DeleteFossilFormation(int id)
            {
                using (var db = new SqlConnection(_connectionString))
                {
                    var deletedFossilFormation = db.QueryFirstOrDefault<FossilFormation>(@"delete
                                                                                           from FossilFormation
                                                                                           where id = @id",
                                                                                           new { id });
                    return deletedFossilFormation;
                }
            }
        
    }
}

