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
        public string Location { get; set; }
        public string Formed { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Fossil { get; set; }
    }
}
