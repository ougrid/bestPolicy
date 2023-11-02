using BestPolicyReport.Models.OutputVatOvInReport;

namespace BestPolicyReport.Services.OutputVatOvInService
{
    public interface IOutputVatOvInService
    {
        Task<List<OutputVatOvInReportResult>?> GetOutputVatOvInReportJson(OutputVatOvInReportInput data);
    }
}
