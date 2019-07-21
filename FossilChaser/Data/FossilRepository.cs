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
    public class FossilRepository
    {
        readonly string _connectionString;

        public FossilRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Fossil AddFossil(string name, string scientificName, string era, string founder, string formation)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newFossil = db.QueryFirstOrDefault<Fossil>(
                                                                @"insert into Fossil (name, scientificName, era, founder, formation)
                                                                Output inserted.*
                                                                values (@name, @scientificName, @era, @founder, @formation)
                                                                select * from Fossil",
                                                                new { name, scientificName, era, founder, formation });

                if (newFossil != null)
                {
                    return newFossil;
                }
            }
            throw new System.Exception("No new fossil found.");
        }

        public IEnumerable<Fossil> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var fossils = db.Query<Fossil>("select * from Fossil").ToList();

                return fossils;
            }
        }

        public Fossil GetSingleFossil(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var singleFossil = db.QueryFirstOrDefault<Fossil>(@"select *
                                                                    from Fossil
                                                                    where id = @id",
                                                                    new { id });
                return singleFossil;
            }
        }


        public Fossil UpdateFossil(Fossil updateFossil)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedFossil = db.QueryFirstOrDefault<Fossil>(@"update Fossil
                                        set name = @name,
                                            scientificName = @scientificName,
                                            era = @era,
                                            founder = @founder,
                                            formation = @formation,
                                            output inserted.*
                                            where id = @id",
                                                            new
                                                            {
                                                                id = updateFossil.Id,
                                                                name = updateFossil.Name,
                                                                scientificName = updateFossil.ScientificName,
                                                                era = updateFossil.Era,
                                                                founder = updateFossil.Founder,
                                                                formation = updateFossil.Formation,
                                                            });
                return updatedFossil;
            }
            throw new System.Exception("Could not update fossil.");
        }

        public Fossil DeleteFossil(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedFossil = db.QueryFirstOrDefault<Fossil>(@"delete
                                                                       from Fossil
                                                                       where id = @id",
                                                                       new { id });
                return deletedFossil;
            }
        }
    }
}
