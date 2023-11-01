using BestPolicyReport.Models;
using BestPolicyReport.Models.BillReport;
using BestPolicyReport.Models.CashierReport;
using BestPolicyReport.Models.OutputVatCommInReport;
using Microsoft.EntityFrameworkCore;

namespace BestPolicyReport.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DailyPolicyReport>().HasNoKey();
            modelBuilder.Entity<BillReportResult>().HasNoKey();
            modelBuilder.Entity<CashierReportResult>().HasNoKey();
            modelBuilder.Entity<OutputVatCommInReportResult>().HasNoKey();
        }

        public DbSet<DailyPolicyReport> DailyPolicyReports { get; set; }
        public DbSet<BillReportResult> BillReportResults { get; set; }
        public DbSet<CashierReportResult> CashierReportResults { get; set; }
        public DbSet<OutputVatCommInReportResult> OutputVatCommInReportResults { get; set; }
    }
}
