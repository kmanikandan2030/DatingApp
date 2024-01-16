using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public record RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(maximumLength:8, MinimumLength =4)]
        public string Password { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        public string DOJ { get; set; }
    }
}