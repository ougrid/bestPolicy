using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace amityReport.Models
{
    public class Transaction
    {
        [Key]public int Id { get; set; }
         public string TransType { get; set; } = null!;
         public string transStatus { get; set; } = null!;
        public int subType { get; set; }
         public string InsurerCode { get; set; } = null!;
         public string agentGroupCode { get; set; } = null!;
         public string policyNo { get; set; } = null!;
         public string agentCode { get; set; } = null!;
         public float amount { get; set; }
         public float duty { get; set; }
         public float stamp { get; set; }
         public float total { get; set; }
         public DateTime payDate { get; set; }
         public string payNo { get; set; } = null!;
         public DateOnly invoiceDate { get; set; }
         public string invoiceNo { get; set; } = null!;
         public string endoseNo { get; set; } = null!;
         public int level { get; set; }
         public DateOnly dueDate { get; set; }
        public DateTime createdAt { get; set; }
         public DateTime updatedAt  { get; set; }
         public int groupSatmentID { get; set; }
        [Column("totalamt")] public float Totalamt { get; set; }

        [Column("paidamt")] public float Paidamt { get; set; }
        [Column("remainamt")] public float Remainamt { get; set; }
        [Column("status")] public string Status { get; set; } = null!;
        [Column("seqno")] public int Seqno { get; set; }
        [Column("commamt")] public float Commamt { get; set; }
        [Column("commtaxamt")] public float Commtaxamt { get; set; }
        [Column("ovamt")] public float Ovamt { get; set; }
        [Column("ovtaxamt")] public float Ovtaxamt { get; set; }
        [Column("rprefdate")] public DateOnly Rprefdate { get; set; } 

        [Column("premin-rprefdate")]public DateOnly Preminrprefdate { get; set; }
        
        [Column("premout-rprefdate")]public DateOnly Premoutrprefdate { get; set; } 
     
    }
}
