using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FossilChaser.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FossilChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [ApiController]
        public class PaymentInformationController : ControllerBase
        {
            readonly UserRepository _repository;
            readonly UserValidator _validator;

            public PaymentInformationController(UserRepository repository)
            {
                _repository = repository;
                _validator = new UserValidator();
            }

            //creating a new user
            [HttpPost]
            public ActionResult AddProduct(CreateUserRequest createRequest)
            {
                if (_validator.Validate(createRequest))
                {
                    return BadRequest("All product information must be filled out.");
                }

                var newProduct = _repository.AddProduct();

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
            public ActionResult GetSingleProduct(int id)
            {
                var singleUser = _repository.GetSingleUser(id);
                return Ok(singleUser);
            }

            //update user
            [HttpPut("{id}")]
            public ActionResult UpdateSingleProduct(User user)
            {
                var updateUser = _repository.UpdateUser(user);
                return Ok(updateUser);
            }

            //delete user for admin purposes mostly
            [HttpDelete("{id}")]
            public ActionResult DeleteSingleUser(int id)
            {
                var deletedUser = _repository.DeleteSingleUser(id);
                return Ok(deletedUser);
            }
        }

        public class CreateProductRequestValidator
        {
            public bool Validate(CreateUserRequest requestToValidate)
            {
                return string.IsNullOrEmpty(requestToValidate.Title)
                    || string.IsNullOrEmpty(requestToValidate.Description);
            }
        }
    }
}