using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FossilChaser.Models;

namespace FossilChaser.Data
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=FossilChaser;Trusted_Connection=True;";

        public User AddUser(int id, string userName, string password, string favorite)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newUser = db.QueryFirstOrDefault<User>(
                                                                @"insert into User (id, userName, password, favorite)
                                                                Output inserted.*
                                                                values (@id, @userName, @password, @favorite)
                                                                select * from User",
                                                                new { id, userName, password, favorite });

                if (User != null)
                {
                    return User;
                }
            }
            throw new System.Exception("No new user found.");
        }

        public IEnumerable<User> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var users = db.Query<User>("select * from User").ToList();

                return users;
            }
        }

        public User GetSingleUsert(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var singleUser = db.QueryFirstOrDefault<User>(@"select *
                                                                    from User
                                                                    where id = @id",
                                                                    new { id });
                return singleUser;
            }
        }


        public User UpdateSingleProduct(User singleUser)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updatedUser = db.QueryFirstOrDefault<User>(@"update User
                                        set userName = @userName,
                                            password = @password,
                                            favorite = @favorite,
                                            output inserted.*
                                            where id = @id",
                                                            new
                                                            {
                                                                id = singleUser.Id,
                                                                userName = singleUser.Username,
                                                                password = singleUser.Password,
                                                                favorite = singleUser.Favorite,
                                                            });
                return updatedUser;
            }
            throw new System.Exception("Could not update user.");
        }

        public User DeleteUser(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
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

