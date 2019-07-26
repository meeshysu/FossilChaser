using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FossilChaser.Models
{
    public class CreateFormationRequest
    {
        public int Id { get; set; }
        public string FormationName { get; set; }
        public string Founder { get; set; }
        public string Region { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
