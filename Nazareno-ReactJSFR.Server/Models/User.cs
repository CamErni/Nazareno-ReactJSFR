using System.ComponentModel.DataAnnotations.Schema;

namespace Nazareno_ReactJSFR.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } // Store as hashed in production

        // This column will store roles as a comma-separated string (e.g., "examiner,admin")
        public string Roles { get; set; } = "examinee";

        // Not mapped to DB: Used in the application to handle roles as a List<string>
        [NotMapped]
        public List<string> RoleList
        {
            get => string.IsNullOrEmpty(Roles) ? new List<string>() : Roles.Split(',').ToList();
            set => Roles = string.Join(",", value);
        }
    }
}
