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
    public class FossilFormationController : ControllerBase
    {
        readonly CreateFossilFormationRequestValidator _validator;
        readonly FossilFormationRepository _repository;

        public FossilFormationController(FossilFormationRepository repository)
        {
            _repository = repository;
            _validator = new CreateFossilFormationRequestValidator();
        }

        //creating a new fossil formation
        [HttpPost]
        public ActionResult AddFossilFormation(CreateFossilFormationRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest("All fossil formation information must be filled out.");
            }

            var newFossilFormation = _repository.AddFossilFormation(createRequest.UserId, createRequest.FossilId, createRequest.FormationId, createRequest.FavoriteId);

            return Created($"api/fossilFormation/{newFossilFormation.Id}", newFossilFormation);
        }

        //get all fossil
        [HttpGet("getAllFossilFormation")]
        public ActionResult GetAllFossilFormations()
        {
            var fossilFormations = _repository.GetAll();
            return Ok(fossilFormations);
        }

        //get single fossil formation
        [HttpGet("getFossilFormation/{id}")]
        public ActionResult GetFossilFormation(int id)
        {
            var singleFossilFormation = _repository.GetFossilFormation(id);
            return Ok(singleFossilFormation);
        }

        //update fossil formation
        [HttpPut("{id}")]
        public ActionResult UpdateFossilFormation(FossilFormation fossilFormation)
        {
            var updateFossil = _repository.UpdateFossilFormation(fossilFormation);
            return Ok(updateFossil);
        }

        //delete fossil formation for admin purposes
        [HttpDelete("{id}")]
        public ActionResult DeleteFossilFormation(int id)
        {
            var deletedFossil = _repository.DeleteFossilFormation(id);
            return Ok(deletedFossil);
        }

        public class CreateFossilFormationRequestValidator
        {
            public bool Validate(CreateFossilFormationRequest requestToValidate)
            {
                return string.IsNullOrEmpty(requestToValidate.UserId.ToString())
                    || string.IsNullOrEmpty(requestToValidate.FossilId.ToString())
                    || string.IsNullOrEmpty(requestToValidate.FormationId.ToString());
            }
        }
    }
}