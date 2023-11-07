using BestPolicyReport.Models.CashierReport;

namespace BestPolicyReport.Services.CashierService
{
    public interface ICashierService
    {
        Task<List<CashierReportResult>?> GetCashierReportJson(CashierReportInput data);
    }
}
