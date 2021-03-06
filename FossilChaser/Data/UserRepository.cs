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
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public User AddUser(string email)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newUser = db.QueryFirstOrDefault<User>(
                                                                @"insert into User (email)
                                                                Output inserted.*
                                                                values (@email)
                                                                select * from User",
                                                                new { email });

                if (newUser != null)
                {
                    return newUser;
                }
            }
            throw new System.Exception("No new user found.");
        }

        public IEnumerable<User> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>("select * from [User]").ToList();

                return users;
            }
        }

        public User GetSingleUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var singleUser = db.QueryFirstOrDefault<User>(@"select *
                                                                    from User
                                                                    where id = @id",
                                                                    new { id });
                return singleUser;
            }
        }


        public User UpdateSingleUser(User singleUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedUser = db.QueryFirstOrDefault<User>(@"update User
                                        set email = @email,
                                            output inserted.*
                                            where id = @id",
                                                            new
                                                            {
                                                                id = singleUser.Id,
                                                                userName = singleUser.Email
                                                            });
                return updatedUser;
            }
            throw new System.Exception("Could not update user.");
        }

        public User DeleteUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedUser = db.QueryFirstOrDefault<User>(@"delete
                                                                       from User
                                                                       where id = @id",
                                                                       new { id });
                return deletedUser;
            }
        }
    }
}

