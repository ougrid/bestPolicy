using amityReport.Models;

namespace report.Services
{
    public interface ITransactionService
    {
        Task<List<Transaction>> GetTransactionList();

        //Task<bool> CreateEmployee(Employee employee);
        //Task<Employee> UpdateEmployee(Employee employee);
        //Task<bool> DeleteEmployee(int key);
    }

}
