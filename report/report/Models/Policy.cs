using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace report.Models
{
    public class Policy
    {
        [Key] public int id { get; set; }
        public string policyNo { get; set; } = null!;
        public string insureeCode { get; set; } = null!;
        public string insurerCode { get; set; } = null!;
        public string agentCode { get; set; } = null!;
        public int itemList { get; set; } 
        public int insureID { get; set; } 
        public string lastVersion { get; set; } = null!;
        public DateTime actDate { get; set; } 
        public DateTime expDate { get; set; } 
        public float netgrossprem { get; set; } 
        public float duty { get; set; } 
        public float tax { get; set; } 
        public float totalprem { get; set; } 
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
    }
}
