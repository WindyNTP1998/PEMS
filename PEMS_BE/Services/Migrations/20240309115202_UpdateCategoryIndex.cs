using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategoryIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsRootCategory",
                table: "Category",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Category_IsRootCategory",
                table: "Category",
                column: "IsRootCategory");

            migrationBuilder.CreateIndex(
                name: "IX_Category_LastUpdatedDate",
                table: "Category",
                column: "LastUpdatedDate");

            migrationBuilder.CreateIndex(
                name: "IX_Category_Name",
                table: "Category",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Category_Name_IsActive",
                table: "Category",
                columns: new[] { "Name", "IsActive" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Category_IsRootCategory",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_LastUpdatedDate",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_Name",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_Name_IsActive",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "IsRootCategory",
                table: "Category");
        }
    }
}
