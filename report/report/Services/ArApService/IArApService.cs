using report.Models.ArApReport;

namespace report.Services.ArApService
{
    public interface IArApService
    {
        Task<List<CommInOvInReportResult>?> GetCommInOvInOpenItemReportJson(ArApReportInput data);
        Task<List<CommInOvInReportResult>?> GetCommInOvInClearingReportJson(ArApReportInput data);
        Task<List<CommInOvInReportResult>?> GetCommInOvInOutstandingReportJson(ArApReportInput data);
        // Task<List<PremOutReportResult>?> GetPremOutOpenItemReportJson(ArApReportInput data);
        // Task<List<PremOutReportResult>?> GetPremOutClearingReportJson(ArApReportInput data);
        // Task<List<PremOutReportResult>?> GetPremOutOutstandingReportJson(ArApReportInput data);
    }
}