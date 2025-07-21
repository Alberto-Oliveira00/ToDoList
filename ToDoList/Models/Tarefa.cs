using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoList.Models
{

    [Table("Tarefas")]
    public class Tarefa
    {
        [Key]
        public int TarefaId { get; set; }
        
        [Required]
        [StringLength(80)]
        public string? Nome { get; set; }

        [Required]
        [StringLength(300)]
        public string Descricao { get; set; }
        public bool Concluida { get; set; }
        public DateTime CriadaEm { get; set; }
        public DateTime? ConcluidaEm { get; set; }

        public void Concluir()
        {
            Concluida = true;
            ConcluidaEm = DateTime.Now;
        }
    }
}
