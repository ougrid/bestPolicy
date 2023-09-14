using amityReport.Models;
using report.Models;

namespace report.Services
{
    public class PolicyService : IPolicyService
    {
        private readonly IDbService _dbService;

        public PolicyService(IDbService dbService)
        {
            _dbService = dbService;
        }

        public async Task<List<Policy>> GetPolicyListbyAgent(Billing data)
        {
            string agentCode = data.agentCode;
            DateTime startDate = data.startDate;
            DateTime endDate = data.endDate;

            var policyList = await _dbService.GetAll<Policy>("SELECT * FROM static_data.\"Policies\" Where \"agentCode\" = @agentCode And \"createdAt\" >= @startDate And \"createdAt\" <= @endDate",
                new
                {
                    agentCode = agentCode,
                    startDate = startDate,
                    endDate = endDate
                });
            return policyList;
        }

        public async Task<List<Policy>> GetPolicyListByPremIn(Billing data)
        {
            string agentCode = data.agentCode;
            DateTime startDate = data.startDate;
            DateTime endDate = data.endDate;
            const cond = '';
            if (startDate)
            {
                cond = cond + ' and startdate = ' + startDate
            }

            var policyList = await _dbService.GetAll<Policy>("SELECT * FROM static_data.\"Policies\" Where \"agentCode\" = @agentCode And \"createdAt\" >= @startDate And \"createdAt\" <= @endDate" + cond,
                new
                {
                    agentCode = agentCode,
                    startDate = startDate,
                    endDate = endDate
                });
            return policyList;
        }
    }
}
