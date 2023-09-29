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


            // select t."policyNo", t."endorseNo", t."receiptno" , t."seqNo", t."netflag"
            // ,(select cashierreceiveno
            // from static_data."b_jaaraps" a
            // where a.dfrpreferno = t."policyNo"
            // and a.rprefdate = t.rprefdate) as cashierNo
            // ,(select diffamt
            // from static_data."b_jaaraps" a
            // where a.dfrpreferno = t."policyNo"
            // and a.rprefdate = t.rprefdate) as diffAmt
            // ,(select cashieramt
            // from static_data."b_jaaraps" a
            // where a.dfrpreferno = t."policyNo"
            // and a.rprefdate = t.rprefdate) as cashierAmt
            // ,(select status
            // from static_data."b_jaaraps" a
            // where a.dfrpreferno = t."policyNo"
            // and a.rprefdate = t.rprefdate) as status
            // from static_data."Transactions" t
            // where t."transType" = 'PREM-IN'
            // and t."duty" in ('1', '2', '3', '4', '5')
            // and t."status" = 'N'
            // and t."createdAt" between '2023-09-01' and '2023-09-30'
            // and t."agentCode" = 'A12134'
            // and t."insurerCode" = 'test23';


            List<Transaction> policyList = await _dbService.GetAll<Transaction>("SELECT t.\"policyNo\", t.\"endorseNo\", t.\"receiptno\", t.\"seqNo\", t.\"netflag\", (SELECT cashierreceiveno FROM static_data.\"b_jaaraps\" a WHERE a.dfrpreferno = t.\"policyNo\" AND a.rprefdate = t.rprefdate) AS cashierNo, (SELECT diffamt FROM static_data.\"b_jaaraps\" a WHERE a.dfrpreferno = t.\"policyNo\" AND a.rprefdate = t.rprefdate) as diffAmt, (SELECT cashieramt FROM static_data.\"b_jaaraps\" a WHERE a.dfrpreferno = t.\"policyNo\" AND a.rprefdate = t.rprefdate) as cashierAmt, (SELECT status FROM static_data.\"b_jaaraps\" a WHERE a.dfrpreferno = t.\"policyNo\" AND a.rprefdate = t.rprefdate) as status FROM static_data.\"Transactions\" t WHERE t.\"transType\" = 'PREM-IN' AND t.\"duty\" in ('1', '2', '3', '4', '5') AND t.\"status\" = 'N' AND t.\"createdAt\" between '2023-09-01' and '2023-09-30' AND t.\"insurerCode\" = @insurerCode AND t.\"agentCode\" = @agentCode;",
                new
                {
                    insurerCode = insurerCode,
                    agentCode = agentCode
                    // policyapprovedate = policyapprovedate --> into t."createdAt" between '2023-09-01' and '2023-09-30'
                });
            return policyList;
        }

        public async Task<List<Transaction>> GetPolicyListByPremInDeduct(Transaction data) // ตัดหนีตัวแทน ตัวตัด 
        {
            string insurerCode = data.insurerCode;
            string agentCode = data.agentCode;

            List<Transaction> policyList = await _dbService.GetAll<Transaction>("<query/>"
            ,
                new
                {
                    insurerCode = insurerCode,
                    agentCode = agentCode
                });
            return policyList;

        }

        public async Task<List<Transaction>> GetPolicyListByPremInBalance(Transaction data) // ตัดหนีตัวแทน ตัวตัด 
        {
            string insurerCode = data.insurerCode;
            string agentCode = data.agentCode;

            List<Transaction> policyList = await _dbService.GetAll<Transaction>("<query/>"
            ,
                new
                {
                    insurerCode = insurerCode,
                    agentCode = agentCode
                });
            return policyList;

        }
    }
}
