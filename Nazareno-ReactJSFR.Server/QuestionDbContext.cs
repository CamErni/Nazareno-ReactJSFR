using Microsoft.EntityFrameworkCore;
using Nazareno_ReactJSFR.Server.Models;

namespace Nazareno_ReactJSFR.Server
{
    public class QuestionDbContext: DbContext
    {
        public QuestionDbContext(DbContextOptions<QuestionDbContext> options) : base(options) { }
        public DbSet<Question> Questions { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Ensure the "Roles" column is treated as a string in the database
            modelBuilder.Entity<User>()
                .Property(u => u.Roles)
                .HasColumnType("nvarchar(max)");
        }
    }
}
