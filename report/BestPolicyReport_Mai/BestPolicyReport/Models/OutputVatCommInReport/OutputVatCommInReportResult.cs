﻿namespace BestPolicyReport.Models.OutputVatCommInReport
{
    public class OutputVatCommInReportResult
    {
        public string? DfRpReferNo { get; set; }
        public DateTime? RpRefDate { get; set; }
        public string? InsurerCode { get; set; }
        public string? InsurerName { get; set; }
        public double? CommInAmt { get; set; }
        public double? VatCommInAmt { get; set; }
        public string? TransactionStatus { get; set; }
        public string? TransactionType { get; set; }
        public string? PolicyStatus { get; set; }
    }
}
