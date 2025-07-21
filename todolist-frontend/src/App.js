import React, { useState, useEffect } from 'react';
import './App.css';
import TarefaForm from './components/TarefaForm';
import TarefaList from './components/TarefaList';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const API_URL = 'https://localhost:7107/Tarefas'; // Verifique a porta da sua API

  // Função para buscar todas as tarefas
  const fetchTarefas = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    fetchTarefas();
  }, []);

  // Função para adicionar uma nova tarefa
  const addTarefa = async (novaTarefa) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaTarefa),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTarefas(); // Recarregar a lista após adicionar
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // Função para marcar/desmarcar tarefa como concluída
  const toggleConcluida = async (id, tarefaAtual) => {
    try {
      const updatedTarefa = { ...tarefaAtual, Concluida: !tarefaAtual.Concluida };
      // Se a tarefa está sendo concluída, defina a data de conclusão
      if (updatedTarefa.Concluida) {
        updatedTarefa.ConcluidaEm = new Date().toISOString();
      } else {
        updatedTarefa.ConcluidaEm = null; // Limpa a data se for desmarcada
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTarefa),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTarefas(); // Recarregar a lista após atualizar
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const editTarefa = async (id, tarefaEditada) => {
    try {
        // Assegura que o campo CriadaEm e ConcluidaEm (se houver) estejam no formato correto (ISO string)
        // Isso é crucial porque a API .NET espera DateTime em formato específico.
        const tarefaParaEnviar = {
            ...tarefaEditada,
            CriadaEm: new Date(tarefaEditada.criadaEm).toISOString(),
            ConcluidaEm: tarefaEditada.concluidaEm ? new Date(tarefaEditada.concluidaEm).toISOString() : null
        };

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefaParaEnviar),
      });
      if (!response.ok) {
        // Tenta ler o erro do corpo da resposta, se disponível
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      fetchTarefas(); // Recarregar a lista após editar
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      alert(`Erro ao editar tarefa: ${error.message}. Verifique o console para mais detalhes.`);
    }
  };

  // Função para deletar uma tarefa
  const deleteTarefa = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTarefas(); // Recarregar a lista após deletar
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <div className="App">
      <h1>Meu ToDoList </h1>
      <TarefaForm onAddTarefa={addTarefa} />
      <TarefaList
        tarefas={tarefas}
        onToggleConcluida={toggleConcluida}
        onDeleteTarefa={deleteTarefa}
        onEditTarefa={editTarefa}
      />
    </div>
  );
}

export default App;