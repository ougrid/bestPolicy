﻿using amityReport.Models;
using report.Models;

namespace report.Services
{
    public interface IPolicyService
    {
        Task<List<Policy>> GetPolicyListbyAgent(Billing data);

        //Task<bool> CreateEmployee(Employee employee);
        //Task<Employee> UpdateEmployee(Employee employee);
        //Task<bool> DeleteEmployee(int key);

        Task<List<Transaction>> GetPolicyListByPremIn(Transaction data);
        Task<List<Transaction>> GetPolicyListByPremInDeduct(Transaction data);
        Task<List<Transaction>> GetPolicyListByPremInBalance(Transaction data);
    }
}
