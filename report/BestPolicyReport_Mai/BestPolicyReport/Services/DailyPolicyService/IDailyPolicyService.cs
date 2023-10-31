using BestPolicyReport.Models;
using Microsoft.AspNetCore.Mvc;

namespace BestPolicyReport.Services.DailyPolicyService
{
    public interface IDailyPolicyService
    {
        Task<List<DailyPolicyReport>?> GetDailyPolicyReportJson(Dictionary<string, string> data);
    }
}
