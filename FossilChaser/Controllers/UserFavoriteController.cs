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
    public class UserFavoriteController : ControllerBase
    {
        readonly CreateUserFavoriteRequestValidator _validator;
        readonly UserFavoriteRepository _repository;

        public UserFavoriteController(UserFavoriteRepository repository)
        {
            _repository = repository;
            _validator = new CreateUserFavoriteRequestValidator();
        }
        [HttpPost]
        public ActionResult AddUser(CreateUserFavoriteRequest createRequest)
        {
            var newUserFavorite = _repository.AddUserFavorite(createRequest.UserId, createRequest.FavoriteId);
            return Created($"/api/userFavorite/{newUserFavorite.Id}", newUserFavorite);

        }

        [HttpGet("getAllUserFavorites")]
        public ActionResult GetAllUserFavorites()
        {
            var allUserFavorite = _repository.GetAllUserFavorites();
            return Ok(allUserFavorite);
        }

        [HttpGet("getSingleUserFavorite/{id}")]
        public ActionResult GetSingleUserFavorite(int id)
        {
            var singleUserFavorite = _repository.GetSingleUserFavorite(id);
            return Ok(singleUserFavorite);
        }

        [HttpGet("getUserFavorites/{userUid}")]
        public ActionResult GetUserFavorite(string userUid)
        {
            var getUserFavorites = _repository.GetUserFavorite(userUid);
            return Ok(getUserFavorites);
        }

        [HttpPut("updateUserFavorite")]
        public ActionResult UpdateUserFavorite(UserFavorite userFavorite)
        {
            var updateUserFavorite = _repository.UpdateCustomerProduct(userFavorite);
            return Ok(updateUserFavorite);
        }

        public class CreateUserFavoriteRequestValidator
        {
            public bool Validate(CreateUserFavoriteRequest requestToValidate)
            {
                return string.IsNullOrEmpty(requestToValidate.UserId.ToString())
                    || string.IsNullOrEmpty(requestToValidate.FavoriteId.ToString());
            }
        }
    }
}