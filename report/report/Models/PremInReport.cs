using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace report.Models
{
    public class PremInReport
    {
        [Key] public int Id { get; set; }
        public string transType { get; set; } = null!;
    }
}