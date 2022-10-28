using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GYMAPI.Migrations
{
    public partial class Add_IsStudent_Column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsStudent",
                table: "MembershipStatuses",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsStudent",
                table: "MembershipStatuses");
        }
    }
}
