namespace BestPolicyReport.Models.CashierReport
{
    public class CashierReportInput
    {
        public string? StartCashierDate { get; set; }
        public string? EndCashierDate { get; set; }
        public string? StartCashierReceiveSubNo { get; set; }
        public string? EndCashierReceiveSubNo { get; set; }
        public string? TransactionType { get; set; }
    }
}
