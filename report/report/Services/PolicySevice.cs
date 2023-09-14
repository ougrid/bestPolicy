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
            // const cond = '';
            // if (data.startDate)
            // {
            //     cond = cond + ' and startdate = ' + data.startdate;
            // }

            // var policyList = await _dbService.GetAll<Policy>("SELECT * FROM static_data.\"Policies\" Where \"agentCode\" = @agentCode And \"createdAt\" >= @startDate And \"createdAt\" <= @endDate" + cond,
            var policyList = await _dbService.GetAll<Policy>("SELECT * FROM static_data.\"Policies\" Where \"agentCode\" = @agentCode And \"createdAt\" >= @startDate And \"createdAt\" <= @endDate",
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
