﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FossilChaser.Models
{
    public class UserFavorite
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int FavoriteId { get; set; }
    }
}
