using Microsoft.EntityFrameworkCore;
using BestPolicyReport.Models.ArApReport;

namespace report.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CommInOvInReportResult>().HasNoKey();
        }

        public DbSet<CommInOvInReportResult> CommInOvInReportResults { get; set; }
    }
}