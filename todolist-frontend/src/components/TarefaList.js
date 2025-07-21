import React, { useState } from 'react';
import './TarefaList.css';

function TarefaList({ tarefas, onToggleConcluida, onDeleteTarefa, onEditTarefa }) {
  const [editingTarefaId, setEditingTarefaId] = useState(null);
  const [editedNome, setEditedNome] = useState('');
  const [editedDescricao, setEditedDescricao] = useState('');

  const handleEditClick = (tarefa) => {
    setEditingTarefaId(tarefa.tarefaId);
    setEditedNome(tarefa.nome);
    setEditedDescricao(tarefa.descricao);
  };

  const handleSaveEdit = (tarefaOriginal) => {
    if (!editedNome.trim() || !editedDescricao.trim()) {
      alert('Nome e descrição da tarefa não podem ser vazios.');
      return;
    }

    const updatedTarefa = {
      ...tarefaOriginal, // Mantém as outras propriedades (id, concluida, datas)
      nome: editedNome,
      descricao: editedDescricao,
    };
    onEditTarefa(tarefaOriginal.tarefaId, updatedTarefa);
    setEditingTarefaId(null); // Sai do modo de edição
  };

  const handleCancelEdit = () => {
    setEditingTarefaId(null);
  };

  return (
    <div className="tarefa-list">
      {tarefas.length === 0 ? (
        <p className="no-tasks">Nenhuma tarefa cadastrada. Adicione uma nova! 😊</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.tarefaId} className={tarefa.concluida ? 'concluida' : ''}>
              {editingTarefaId === tarefa.tarefaId ? (
                // Modo de edição
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editedNome}
                    onChange={(e) => setEditedNome(e.target.value)}
                    className="edit-input"
                  />
                  <textarea
                    value={editedDescricao}
                    onChange={(e) => setEditedDescricao(e.target.value)}
                    className="edit-textarea"
                  ></textarea>
                  <div className="tarefa-actions">
                    <button onClick={() => handleSaveEdit(tarefa)} className="btn-concluir">Salvar</button>
                    <button onClick={handleCancelEdit} className="btn-deletar">Cancelar</button>
                  </div>
                </div>
              ) : (
                // Modo de visualização
                <>
                  <div>
                    <h3>{tarefa.nome}</h3>
                    <p>{tarefa.descricao}</p>
                    <small>Criada em: {new Date(tarefa.criadaEm).toLocaleDateString()}</small>
                    {tarefa.concluidaEm && (
                      <small> | Concluída em: {new Date(tarefa.concluidaEm).toLocaleDateString()}</small>
                    )}
                  </div>
                  <div className="tarefa-actions">
                    <button
                      onClick={() => onToggleConcluida(tarefa.tarefaId, tarefa)}
                      className={tarefa.concluida ? 'btn-desmarcar' : 'btn-concluir'}
                    >
                      {tarefa.concluida ? 'Desmarcar' : 'Concluir'}
                    </button>
                    {!tarefa.concluida && ( // Apenas permite editar se não estiver concluída
                        <button onClick={() => handleEditClick(tarefa)} className="btn-editar">
                        Editar
                        </button>
                    )}
                    <button onClick={() => onDeleteTarefa(tarefa.tarefaId)} className="btn-deletar">
                      Deletar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TarefaList;