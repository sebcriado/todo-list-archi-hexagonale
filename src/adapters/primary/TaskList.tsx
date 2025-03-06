// src/adapters/primary/TaskList.tsx
import React from 'react';
import { useTasksContext } from './TasksContext';
import './TaskList.css'; // Si vous souhaitez ajouter des styles

export const TaskList: React.FC = () => {
  const { tasks, loading, error, toggleTask, removeTask } = useTasksContext();

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error.message}</div>;
  if (tasks.length === 0) return <div className="empty-list">Aucune tâche disponible</div>;

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={task.completed ? 'task completed' : 'task'}>
          <label className="task-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-title">{task.title}</span>
          </label>
          <span className="task-date">
            {task.createdAt.toLocaleDateString()}
          </span>
          <button 
            className="delete-btn"
            onClick={() => removeTask(task.id)}
            aria-label="Supprimer la tâche"
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
};
