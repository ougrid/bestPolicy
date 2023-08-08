using amityReport.Models;

namespace report.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IDbService _dbService;

        public TransactionService(IDbService dbService)
        {
            _dbService = dbService;
        }

        public async Task<List<Transaction>> GetTransactionList()
        {
            var transactionList = await _dbService.GetAll<Transaction>("SELECT * FROM static_data.\"Transactions\"", new { });
            return transactionList;
        }
    }
}
