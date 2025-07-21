using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoList.Migrations
{
    /// <inheritdoc />
    public partial class PopularTarefa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder mb)
        {
            mb.Sql("INSERT INTO Tarefas (Nome, Descricao, Concluida, CriadaEm, ConcluidaEm)" +
                "VALUES ('Estudar ASP.NET Core', 'Ler a documentação oficial e criar um projeto básico.', 0, GETDATE(), NULL)");

            mb.Sql("INSERT INTO Tarefas (Nome, Descricao, Concluida, CriadaEm, ConcluidaEm)" +
                "VALUES ('Estudar Java', 'Javinha do mal', 0, GETDATE(), NULL)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder mb)
        {
            mb.Sql("Delete from Tarefas");
        }
    }
}
