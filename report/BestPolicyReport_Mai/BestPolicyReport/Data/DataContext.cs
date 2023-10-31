using BestPolicyReport.Models;
using BestPolicyReport.Models.BillReport;
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
        }

        public DbSet<DailyPolicyReport> DailyPolicyReports { get; set; }
        public DbSet<BillReportResult> BillReportResults { get; set; }
    }
}
