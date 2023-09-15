﻿using amityReport.Models;
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

        public async Task<List<Transaction>> GetPolicyListByPremIn(Transaction data)
        {
            // string agentCode = data.agentCode;
            // DateTime startDate = data.startDate;
            // DateTime endDate = data.endDate;

            string insurerCode = data.insurerCode;
            string agentCode = data.agentCode;


            // const cond = '';
            // if (data.startDate)
            // {
            //     cond = cond + ' and startdate = ' + data.startdate;
            // }

            // var policyList = await _dbService.GetAll<Policy>("SELECT * FROM static_data.\"Policies\" Where \"agentCode\" = @agentCode And \"createdAt\" >= @startDate And \"createdAt\" <= @endDate" + cond,


            // var policyList = await _dbService.GetAll<Policy>("SELECT * FROM static_data.\"Policies\" Where \"agentCode\" = @agentCode And \"createdAt\" >= @startDate And \"createdAt\" <= @endDate",
            //     new
            //     {
            //         agentCode = agentCode,
            //         startDate = startDate,
            //         endDate = endDate
            //     });
            // return policyList;


            //             select t."policyNo", t."endorseNo", t."receiptno" , t."seqNo"
            // ,(select cashierreceiveno
            //   from static_data."b_jaaraps" a
            //   where a.dfrpreferno = t."policyNo"
            //   and a.rprefdate = t.rprefdate) as cashierno
            // --,(
            // from static_data."Transactions" t
            // where t."transType" = 'PREM-IN'
            // and t."duty" in ('1', '2', '3', '4', '5')
            // and t."status" = 'N'
            // and t."createdAt" between '2023-09-01' and '2023-09-30'
            // and t."insurerCode" = 'test23'
            // and t."agentCode" = 'A12134';


            List<Transaction> policyList = await _dbService.GetAll<Transaction>("SELECT t.\"policyNo\", t.\"endorseNo\", t.\"receiptno\", t.\"seqNo\", (SELECT cashierreceiveno FROM static_data.\"b_jaaraps\" a WHERE a.dfrpreferno = t.\"policyNo\" AND a.rprefdate = t.rprefdate) AS cashierno FROM static_data.\"Transactions\" t WHERE t.\"transType\" = 'PREM-IN' AND t.\"duty\" in ('1', '2', '3', '4', '5') AND t.\"status\" = 'N' AND t.\"createdAt\" between '2023-09-01' and '2023-09-30' AND t.\"insurerCode\" = @insurerCode AND t.\"agentCode\" = @agentCode;",
                new
                {
                    insurerCode = insurerCode,
                    agentCode = agentCode
                    // policyapprovedate = policyapprovedate --> into t."createdAt" between '2023-09-01' and '2023-09-30'
                });
            return policyList;
        }
    }
}
