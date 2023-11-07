﻿using BestPolicyReport.Models.DailyPolicyReport;
using BestPolicyReport.Models.BillReport;
using BestPolicyReport.Models.CashierReport;
using BestPolicyReport.Models.OutputVatCommInReport;
using BestPolicyReport.Models.OutputVatOvInReport;
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
            modelBuilder.Entity<DailyPolicyReportResult>().HasNoKey();
            modelBuilder.Entity<BillReportResult>().HasNoKey();
            modelBuilder.Entity<CashierReportResult>().HasNoKey();
            modelBuilder.Entity<OutputVatCommInReportResult>().HasNoKey();
            modelBuilder.Entity<OutputVatOvInReportResult>().HasNoKey();
        }

        public DbSet<DailyPolicyReportResult> DailyPolicyReportResults { get; set; }
        public DbSet<BillReportResult> BillReportResults { get; set; }
        public DbSet<CashierReportResult> CashierReportResults { get; set; }
        public DbSet<OutputVatCommInReportResult> OutputVatCommInReportResults { get; set; }
        public DbSet<OutputVatOvInReportResult> OutputVatOvInReportResults { get; set; }
    }
}
