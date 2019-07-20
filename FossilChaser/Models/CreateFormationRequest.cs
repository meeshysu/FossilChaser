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
        public string State { get; set; }
        public string Country { get; set; }
        public int Longitude { get; set; }
        public int Latitude { get; set; }
    }
}
