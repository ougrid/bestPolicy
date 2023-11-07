using BestPolicyReport.Models.DailyPolicyReport;

namespace BestPolicyReport.Services.DailyPolicyService
{
    public interface IDailyPolicyService
    {
        Task<List<DailyPolicyReportResult>?> GetDailyPolicyReportJson(DailyPolicyReportInput data);
    }
}
