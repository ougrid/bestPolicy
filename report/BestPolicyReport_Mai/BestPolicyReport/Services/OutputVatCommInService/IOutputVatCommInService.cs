using BestPolicyReport.Models.OutputVatCommInReport;

namespace BestPolicyReport.Services.OutputVatCommInService
{
    public interface IOutputVatCommInService
    {
        Task<List<OutputVatCommInReportResult>?> GetOutputVatCommInReportJson(OutputVatCommInReportInput data);
    }
}
