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
    public class FormationRepository
    {
        readonly string _connectionString;

        public FormationRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Formation AddFormation(string formationName, string founder, string region, string state, string country, float latitude, float longitude)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newFormation = db.QueryFirstOrDefault<Formation>(
                                                                @"insert into Formation (formationName, founder, region, state, country, latitude, longitude)
                                                                Output inserted.*
                                                                values (@formationName, @founder, @region, @state, @country, @latitude, @longitude)
                                                                select * from Formation",
                                                                new { formationName, founder, region, state, country, latitude, longitude });

                if (newFormation != null)
                {
                    return newFormation;
                }
            }
            throw new System.Exception("No new formation found.");
        }

        public IEnumerable<Formation> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var formations = db.Query<Formation>("select * from Formation").ToList();

                return formations;
            }
        }

        public Formation GetFormation(int id)
        {
            using (var db = new SqlConnection(_connectionString))
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
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedFormation = db.QueryFirstOrDefault<Formation>(@"update Formation
                                        set formationName = @formationName,
                                            founder = @founder,
                                            region = @region,
                                            state = @state,
                                            country = @country,
                                            latitude = @latitude,
                                            longitude = @longitude
                                            output inserted.*
                                            where id = @id",
                                                            new
                                                            {
                                                                id = updateFormation.Id,
                                                                formationName = updateFormation.FormationName,
                                                                founder = updateFormation.Founder,
                                                                region = updateFormation.Region,
                                                                state = updateFormation.State,
                                                                country = updateFormation.Country,
                                                                latitude = updateFormation.Latitude,
                                                                longitude = updateFormation.Longitude
                                                            });
                return updatedFormation;
            }
            throw new System.Exception("Could not update formation.");
        }

        public Formation DeleteFormation(int id)
        {
            using (var db = new SqlConnection(_connectionString))
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
