using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Context;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TarefasController : ControllerBase
    {

        private readonly AppDbContext _context;

        public TarefasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Tarefa>> Get()
        {
            return _context.Tarefas.AsNoTracking().ToList();
        }

        [HttpGet("{id:int}", Name = "ObterTarefa")]
        public ActionResult<Tarefa> Get(int id)
        {
            var tarefa = _context.Tarefas.FirstOrDefault(t => t.TarefaId == id);

            if (tarefa is null)
                return NotFound("Tarefa não encontrada!");

            return Ok(tarefa);
        }

        [HttpPost]
        public ActionResult Post(Tarefa tarefa)
        {
            if (tarefa is null)
                return BadRequest();

            tarefa.Concluida = false;
            tarefa.ConcluidaEm = null;

            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();

            return new CreatedAtRouteResult("ObterTarefa", new { id = tarefa.TarefaId }, tarefa);

        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, Tarefa tarefa)
        {
            if (id != tarefa.TarefaId)
            {
                return BadRequest($"Categoria com o id: {id} não encontrada...");
            }
            _context.Entry(tarefa).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok(tarefa);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var tarefa = _context.Tarefas.FirstOrDefault(t => t.TarefaId == id);

            if (tarefa is null)
                return NotFound($"Categoria com id {id} não encontrada...");

            _context.Tarefas.Remove(tarefa);
            _context.SaveChanges();
            return Ok("Categoria excluida com sucesso...");
        }
    }
}
