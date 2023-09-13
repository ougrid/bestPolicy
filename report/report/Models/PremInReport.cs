using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace report.Models
{
    public class PremInReport
    {
        [Key] public int Id { get; set; };
        public string policyNo { get; set; } = null!;
        public string invoiceNo { get; set; };
        public string seqNo { get; set; };
        public string cashierNo { get; set; };
        public string cashierAmt { get; set; };
        public string cashierReceiveType { get; set; };
        public string cashierRefNo { get; set; };
        public DateTime cashierRefDate { get; set; };
        public string premInDebtWriteOffNo { get; set; };
        public DateTime premInDebtWriteOffDate { get; set; };
        public string netFlag { get; set; };
        public float premInDebtWriteOffAmt { get; set; };
        public float diffAmt { get; set; };
        puclic string status { get; set; };
        public DateTime effectiveDate { get; set; };
        public DateTime expiryDate { get; set; };
        public string advisorCode { get; set; };
        public string advisorName { get; set; };
        public string customerId { get; set; };
    }
}