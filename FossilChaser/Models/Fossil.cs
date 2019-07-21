using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FossilChaser.Models
{
    public class Fossil
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ScientificName { get; set; }
        public string Era { get; set; }
        public string Founder { get; set; }
        public string Formation { get; set; }
    }
}
