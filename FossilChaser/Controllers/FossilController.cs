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
    public class FossilController : ControllerBase
    {
            readonly CreateFossilRequestValidator _validator;
            readonly FossilRepository _repository;

            public FossilController(FossilRepository repository)
            {
                _repository = repository;
                _validator = new CreateFossilRequestValidator();
            }

            //creating a new user
            [HttpPost]
            public ActionResult AddFossil(CreateFossilRequest createRequest)
            {
                if (_validator.Validate(createRequest))
                {
                    return BadRequest("All product information must be filled out.");
                }

                var newUser = _repository.AddFossil(createRequest.Name, createRequest.ScientificName, createRequest.Era, createRequest.ScientificFounder, createRequest.Formation);

                return Created($"api/user/{newUser.Id}", newUser);
            }

            //get all fossil
            [HttpGet("getAllFossils")]
            public ActionResult GetAllFossils()
            {
                var fossils = _repository.GetAll();
                return Ok(fossils);
            }

            //get single fossil 
            [HttpGet("getFossil/{id}")]
            public ActionResult GetSingleFossil(int id)
            {
                var singleFossil = _repository.GetSingleFossil(id);
                return Ok(singleFossil);
            }

            //update fossil
            [HttpPut("{id}")]
            public ActionResult UpdateSingleFossil(Fossil fossil)
            {
                var updateFossil = _repository.UpdateFossil(fossil);
                return Ok(updateFossil);
            }

            //delete fossil for admin purposes
            [HttpDelete("{id}")]
            public ActionResult DeleteSingleFossil(int id)
            {
                var deletedFossil = _repository.DeleteFossil(id);
                return Ok(deletedFossil);
            }

        public class CreateFossilRequestValidator
        {
            public bool Validate(CreateFossilRequest requestToValidate)
            {
                return string.IsNullOrEmpty(requestToValidate.Name)
                    || string.IsNullOrEmpty(requestToValidate.Era);
            }
        }
    }
}