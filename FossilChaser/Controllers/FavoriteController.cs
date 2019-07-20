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
    public class FavoriteController : ControllerBase
    {
            readonly CreateFavoriteRequestValidator _validator;
            readonly FavoriteRepository _repository;

            public FavoriteController(FavoriteRepository repository)
            {
                _repository = repository;
                _validator = new CreateFavoriteRequestValidator();
            }

            //creating a new favorite
            [HttpPost]
            public ActionResult AddFavorite(CreateFavoriteRequest createRequest)
            {
                if (_validator.Validate(createRequest))
                {
                    return BadRequest("All favorite information must be filled out.");
                }

                var newFavorite = _repository.AddFavorite(createRequest.UserId, createRequest.FossilId, createRequest.FormationId);

                return Created($"api/favorite/{newFavorite.Id}", newFavorite);
            }

            //get all favorites
            [HttpGet("getAllFavorites")]
            public ActionResult getAllFavorites()
            {
                var favorites = _repository.GetAll();
                return Ok(favorites);
            }

            //get single favorite 
            [HttpGet("getFavorite/{id}")]
            public ActionResult GetFavorite(int id)
            {
                var singleFavorite = _repository.GetFavorite(id);
                return Ok(singleFavorite);
            }

            //update favorite
            [HttpPut("{id}")]
            public ActionResult UpdateFavorite(Favorite favorite)
            {
                var updateFavorite = _repository.UpdateFavorite(favorite);
                return Ok(updateFavorite);
            }

            //delete favorite for admin purposes
            [HttpDelete("{id}")]
            public ActionResult DeleteFavorite(int id)
            {
                var deletedFavorite = _repository.DeleteFavorite(id);
                return Ok(deletedFavorite);
            }
        

        public class CreateFavoriteRequestValidator
        {
            public bool Validate(CreateFavoriteRequest requestToValidate)
            {
                return string.IsNullOrEmpty(requestToValidate.UserId.ToString())
                    || string.IsNullOrEmpty(requestToValidate.FossilId.ToString())
                    || string.IsNullOrEmpty(requestToValidate.FormationId.ToString());
            }
        }
    }
}