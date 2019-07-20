using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FossilChaser.Models;

namespace FossilChaser.Data
{
    public class FormationRepository
    {
        const string ConnectionString = "Server=localhost;Database=FossilChaser;Trusted_Connection=True;";

        public Formation AddFormation(string formationName, string founder, string state, string country, int longitude, int latitude)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newFormation = db.QueryFirstOrDefault<Formation>(
                                                                @"insert into Formation (formationName, founder, state, country, longitude, latitude)
                                                                Output inserted.*
                                                                values (@formationName, @founder, @state, @country, @longitude, @latitude)
                                                                select * from User",
                                                                new { formationName, founder, state, country, longitude, latitude });

                if (newFormation != null)
                {
                    return newFormation;
                }
            }
            throw new System.Exception("No new formation found.");
        }

        public IEnumerable<Formation> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var formations = db.Query<Formation>("select * from Formation").ToList();

                return formations;
            }
        }

        public Formation GetFormation(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var singleFormation = db.QueryFirstOrDefault<Formation>(@"select *
                                                                    from Formation
                                                                    where id = @id",
                                                                    new { id });
                return singleFormation;
            }
        }


        public Formation UpdateFormation(Formation updateFormation)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updatedFormation = db.QueryFirstOrDefault<Formation>(@"update Formation
                                        set formationName = @formationName,
                                            founder = @founder,
                                            state = @state,
                                            country = @country,
                                            longitude = @longitude,
                                            latitude = @latitude,
                                            output inserted.*
                                            where id = @id",
                                                            new
                                                            {
                                                                formationName = updateFormation.FormationName,
                                                                founder = updateFormation.Founder,
                                                                state = updateFormation.State,
                                                                country = updateFormation.Country,
                                                                longitude = updateFormation.Longitude,
                                                                latitude = updateFormation.Latitude,
                                                            });
                return updatedFormation;
            }
            throw new System.Exception("Could not update formation.");
        }

        public Formation DeleteFormation(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var deletedFormation = db.QueryFirstOrDefault<Formation>(@"delete
                                                                 from Formation
                                                                 where id = @id",
                                                                 new { id });
                return deletedFormation;
            }
        }
    }
}
