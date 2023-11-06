namespace BestPolicyReport.Models.OutputVatOvInReport
{
    public class OutputVatOvInReportResult
    {
        public string? DfRpReferNo { get; set; }
        public DateTime? RpRefDate { get; set; }
        public string? InsurerCode { get; set; }
        public string? InsurerName { get; set; }
        public double? OvInAmt { get; set; }
        public double? VatOvInAmt { get; set; }
        public string? TransactionStatus { get; set; }
        public string? TransactionType { get; set; }
        public string? PolicyStatus { get; set; }
    }
}
