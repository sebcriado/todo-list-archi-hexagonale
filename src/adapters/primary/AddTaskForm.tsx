import React, { useState } from 'react';
import { useTasksContext } from './TasksContext';
import './AddTaskForm.css'; // Si vous souhaitez ajouter des styles

export const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasksContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await addTask(title);
    setTitle('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
        className="task-input"
      />
      <button type="submit" className="add-btn">Ajouter</button>
    </form>
  );
};
