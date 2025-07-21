import React, { useState } from 'react';
import './TarefaForm.css'; // Opcional: para estilos específicos do formulário

function TarefaForm({ onAddTarefa }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim() || !descricao.trim()) {
      alert('Por favor, preencha o nome e a descrição da tarefa.');
      return;
    }
    onAddTarefa({ Nome: nome, Descricao: descricao, CriadaEm: new Date().toISOString() });
    setNome('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit} className="tarefa-form">
      <input
        type="text"
        placeholder="Nome da Tarefa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição da Tarefa"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      ></textarea>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}

export default TarefaForm;