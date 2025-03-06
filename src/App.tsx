import React from 'react';
import { TaskService } from './core/useCases/TaskService';
import { LocalStorageTaskRepository } from './adapters/secondary/LocalStorageTaskRepository';
import { TasksProvider } from './adapters/primary/TasksContext';
import { TasksPage } from './adapters/primary/TasksPage';
import './App.css';

const App: React.FC = () => {
  // Initialisation des dépendances
  // Vous pouvez choisir entre InMemoryTaskRepository (en mémoire) ou LocalStorageTaskRepository (persistent)
  const taskRepository = new LocalStorageTaskRepository();
  const taskService = new TaskService(taskRepository);

  return (
    <div className="app">
      <TasksProvider taskService={taskService}>
        <TasksPage />
      </TasksProvider>
    </div>
  );
};

export default App;
