import React from 'react';
import { TaskList } from './TaskList';
import { AddTaskForm } from './AddTaskForm';
import './TasksPage.css'; // Si vous souhaitez ajouter des styles

export const TasksPage: React.FC = () => {
  return (
    <div className="tasks-page">
      <header className="header">
        <h1>Gestionnaire de tâches</h1>
      </header>
      <main className="main-content">
        <AddTaskForm />
        <TaskList />
      </main>
    </div>
  );
};
