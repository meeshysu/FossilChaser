﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FossilChaser.Models
{
    public class CreateUserRequest
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Favorite { get; set; }
    }
}
