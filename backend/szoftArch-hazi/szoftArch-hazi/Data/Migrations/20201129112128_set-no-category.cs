using Microsoft.EntityFrameworkCore.Migrations;

namespace szoftArch_hazi.Data.Migrations
{
    public partial class setnocategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sets_Categories_CategoryId",
                table: "Sets");

            migrationBuilder.DropIndex(
                name: "IX_Sets_CategoryId",
                table: "Sets");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Sets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Sets",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sets_CategoryId",
                table: "Sets",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sets_Categories_CategoryId",
                table: "Sets",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
