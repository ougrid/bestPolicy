using BestPolicyReport.Data;
using BestPolicyReport.Models;
using BestPolicyReport.Models.CashierReport;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BestPolicyReport.Services.CashierService
{
    public class CashierService : ICashierService
    {
        private readonly DataContext _dataContext;

        public CashierService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<CashierReportResult>?> GetCashierReportJson(CashierReportInput data)
        {
            var sql = $@"select c.cashierreceiveno as ""cashierReceiveNo"", c.cashierdate as ""cashierDate"", c.billadvisorno as ""billAdvisorNo"", a.billdate as ""billDate"",
                         c.receivefrom as ""receiveFrom"", c.receivename as ""receiveName"", c.receivetype as ""receiveType"", c.refno as ""refNo"", c.refdate as ""refDate"",
                         c.transactiontype as ""transactionType"", r.cashieramt as ""cashierAmt"", c.dfrpreferno as ""dfRpReferNo"", r.rprefdate as ""rpRefDate"",
                         r.actualvalue as ""actualValue"", r.diffamt as ""diffAmt"", r.status
                         from static_data.b_jacashiers c, static_data.b_jabilladvisors a, static_data.b_jaaraps r
                         where c.billadvisorno = a.billadvisorno and c.dfrpreferno = r.dfrpreferno and c.cashierreceiveno = r.cashierreceiveno ";
            string currentDate = DateTime.Now.ToString("yyyy-MM-dd", new System.Globalization.CultureInfo("en-US"));
            if (!string.IsNullOrEmpty(data.StartCashierDate?.ToString()))
            {
                if (!string.IsNullOrEmpty(data.EndCashierDate?.ToString()))
                {
                    sql += $@"and c.cashierdate between '{data.StartCashierDate}' and '{data.EndCashierDate}' ";
                }
                else
                {
                    sql += $@"and c.cashierdate between '{data.StartCashierDate}' and '{currentDate}' ";
                }
            }
            if (!string.IsNullOrEmpty(data.StartCashierReceiveNo) && !string.IsNullOrEmpty(data.EndCashierReceiveNo))
            {
                sql += $@"and c.cashierreceiveno between {data.StartCashierReceiveNo} and {data.EndCashierReceiveNo} ";
            }
            if (!string.IsNullOrEmpty(data.TransactionType))
            {
                sql += $@"and c.transactiontype = '{data.TransactionType}' ";
            }

            sql += $@";";
            var json = await _dataContext.CashierReportResults.FromSqlRaw(sql).ToListAsync();
            return json;
        }
    }
}
