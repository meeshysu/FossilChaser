using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FossilChaser.Data;
using FossilChaser.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FossilChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
            readonly CreateUserRequestValidator _validator;
            readonly UserRepository _repository;

            public UserController(UserRepository repository)
            {
                _repository = repository;
                _validator = new CreateUserRequestValidator();
            }

            //creating a new user
            [HttpPost]
            public ActionResult AddUser(CreateUserRequest createRequest)
            {
                if (_validator.Validate(createRequest))
                {
                    return BadRequest("All product information must be filled out.");
                }

                var newUser = _repository.AddUser(createRequest.Email);

                return Created($"api/user/{newUser.Id}", newUser);
            }

            //get all users
            [HttpGet("getAllUsers")]
            public ActionResult GetAllUsers()
            {
                var users = _repository.GetAll();
                return Ok(users);
            }

            //get single user 
            [HttpGet("getSingleUser/{id}")]
            public ActionResult GetSingleUser(int id)
            {
                var singleUser = _repository.GetSingleUser(id);
                return Ok(singleUser);
            }

            //update user
            [HttpPut("updateUser/{id}")]
            public ActionResult UpdateSingleUser(User user)
            {
                var updateUser = _repository.UpdateSingleUser(user);
                return Ok(updateUser);
            }

            //delete user for admin purposes mostly
            [HttpDelete("deleteUser/{id}")]
            public ActionResult DeleteSingleUser(int id)
            {
                var deletedUser = _repository.DeleteUser(id);
                return Ok(deletedUser);
            }

        public class CreateUserRequestValidator
        {
            public bool Validate(CreateUserRequest requestToValidate)
            {
                return string.IsNullOrEmpty(requestToValidate.Email);
            }
        }
    }
}