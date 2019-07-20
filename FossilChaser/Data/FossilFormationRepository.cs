using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FossilChaser.Models;

namespace FossilChaser.Data
{
    public class FossilFormationRepository
    {
            const string ConnectionString = "Server=localhost;Database=FossilChaser;Trusted_Connection=True;";

            public FossilFormation AddFossilFormation(int userId, int fossilId, int formationId)
            {
                using (var db = new SqlConnection(ConnectionString))
                {
                    var newFossilFormation = db.QueryFirstOrDefault<FossilFormation>(
                                                                                    @"insert into FossilFormation (userId, fossilId, formationId)
                                                                                    Output inserted.*
                                                                                    values (@userId, @fossilId, @formationId)
                                                                                    select * from User",
                                                                                    new { userId, fossilId, formationId });

                    if (newFossilFormation != null)
                    {
                        return newFossilFormation;
                    }
                }
                throw new System.Exception("No new fossil formation found.");
            }

            public IEnumerable<FossilFormation> GetAll()
            {
                using (var db = new SqlConnection(ConnectionString))
                {
                    var fossilFormation = db.Query<FossilFormation>("select * from Fossil Formation").ToList();

                    return fossilFormation;
                }
            }

            public FossilFormation GetFossilFormation(int id)
            {
                using (var db = new SqlConnection(ConnectionString))
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
                using (var db = new SqlConnection(ConnectionString))
                {
                    var updateFossilFormation = db.QueryFirstOrDefault<FossilFormation>(@"update FossilFormation
                                                                                           set userId = @userId,
                                                                                           fossilId = @fossilId,
                                                                                           formationId = @formationId,
                                                                                           output inserted.*
                                                                                           where id = @id",
                                                                                           new
                                                                                           {
                                                                                               userName = fossilFormation.UserId,
                                                                                               password = fossilFormation.FossilId,
                                                                                               favorite = fossilFormation.FormationId,
                                                                                           });
                    return updateFossilFormation;
                }
                throw new System.Exception("Could not update fossil formation.");
            }

            public FossilFormation DeleteFossilFormation(int id)
            {
                using (var db = new SqlConnection(ConnectionString))
                {
                    var deletedFossilFormation = db.QueryFirstOrDefault<FossilFormation>(@"delete
                                                                                           from User
                                                                                           where id = @id",
                                                                                           new { id });
                    return deletedFossilFormation;
                }
            }
        
    }
}

