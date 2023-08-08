using amityReport.Models;
using Microsoft.EntityFrameworkCore;

namespace amityReport.Context
{
    public class ApplicationDbContext : DbContext

    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) 
        { 
        
        }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
