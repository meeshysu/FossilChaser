﻿using System;
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
    public class FormationController : ControllerBase
    {
        readonly CreateFormationRequestValidator _validator;
        readonly FormationRepository _repository;

        public FormationController(FormationRepository repository)
        {
            _repository = repository;
            _validator = new CreateFormationRequestValidator();
        }

        //creating a new formation
        [HttpPost]
        public ActionResult AddFormation(CreateFormationRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest("All formation information must be filled out.");
            }

            var newFormation = _repository.AddFormation(createRequest.FormationName, createRequest.Founder, createRequest.Region, createRequest.State, createRequest.Country, createRequest.Latitude, createRequest.Longitude);

            return Created($"api/formation/{newFormation.Id}", newFormation);
        }

        //get all formation
        [HttpGet("getAllFormations")]
        public ActionResult getAllFormations()
        {
            var formations = _repository.GetAll();
            return Ok(formations);
        }

        //get single formation 
        [HttpGet("getFormation/{id}")]
        public ActionResult GetFormation(int id)
        {
            var singleFormation = _repository.GetFormation(id);
            return Ok(singleFormation);
        }

        //update formation
        [HttpPut("{id}")]
        public ActionResult UpdateFormation(Formation formation)
        {
            var updateFormation = _repository.UpdateFormation(formation);
            return Ok(updateFormation);
        }

        //delete formation for admin purposes
        [HttpDelete("{id}")]
        public ActionResult DeleteFormation(int id)
        {
            var deletedFormation = _repository.DeleteFormation(id);
            return Ok(deletedFormation);
        }


        public class CreateFormationRequestValidator
        {
            public bool Validate(CreateFormationRequest requestToValidate)
            {
                return string.IsNullOrEmpty(requestToValidate.FormationName)
                    || string.IsNullOrEmpty(requestToValidate.Founder)
                    || string.IsNullOrEmpty(requestToValidate.State)
                    || string.IsNullOrEmpty(requestToValidate.Country);
            }
        }
    }
}