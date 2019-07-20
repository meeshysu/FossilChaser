using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FossilChaser.Models;

namespace FossilChaser.Data
{
    public class FossilRepository
    {
        const string ConnectionString = "Server=localhost;Database=FossilChaser;Trusted_Connection=True;";

        public Fossil AddFossil(string name, string scientificName, string era, string scientificFounder, string formation)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newFossil = db.QueryFirstOrDefault<Fossil>(
                                                                @"insert into Fossil (name, scientificName, era, scientificFounder, formation)
                                                                Output inserted.*
                                                                values (@name, @scientificName, @era, @scientificFounder, @formation)
                                                                select * from User",
                                                                new { name, scientificName, era, scientificFounder, formation });

                if (newFossil != null)
                {
                    return newFossil;
                }
            }
            throw new System.Exception("No new fossil found.");
        }

        public IEnumerable<Fossil> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var fossils = db.Query<Fossil>("select * from Fossil").ToList();

                return fossils;
            }
        }

        public Fossil GetSingleFossil(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
            {
                var updatedFossil = db.QueryFirstOrDefault<Fossil>(@"update Fossil
                                        set name = @name,
                                            scientificName = @scientificName,
                                            era = @era,
                                            scientificFounder = @scientificFounder,
                                            formation = @formation,
                                            output inserted.*
                                            where id = @id",
                                                            new
                                                            {
                                                                name = updateFossil.Name,
                                                                scientificName = updateFossil.ScientificName,
                                                                era = updateFossil.Era,
                                                                scientificFounder = updateFossil.ScientificFounder,
                                                                formation = updateFossil.Formation,
                                                            });
                return updatedFossil;
            }
            throw new System.Exception("Could not update fossil.");
        }

        public Fossil DeleteFossil(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
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
