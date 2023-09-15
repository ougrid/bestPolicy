// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace report.Models
// {
//     public class PremInReport
//     {
//         [Key] public int Id { get; set; }
//         public string policyNo { get; set; } = null!;
//         public string invoiceNo { get; set; } = null!;
//         public string seqNo { get; set; } = null!;
//         public string cashierNo { get; set; } = null!;
//         public string cashierAmt { get; set; } = null!;
//         public string cashierReceiveType { get; set; } = null!;
//         public string cashierRefNo { get; set; } = null!;
//         public DateTime cashierRefDate { get; set; }
//         public string premInDebtWriteOffNo { get; set; } = null!;
//         public DateTime premInDebtWriteOffDate { get; set; }
//         public string netFlag { get; set; } = null!;
//         public float premInDebtWriteOffAmt { get; set; }
//         public float diffAmt { get; set; }
//         public string status { get; set; }
//         public DateTime effectiveDate { get; set; }
//         public DateTime expiryDate { get; set; }
//         public string advisorCode { get; set; } = null!;
//         public string advisorName { get; set; } = null!;
//         public string customerId { get; set; } = null!;


//         public string insurerCode { get; set; }
//         public string agentCode { get; set; }
//     }
// }