import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../../core/domain/Task';
import { TaskService } from '../../core/useCases/TaskService';
import { TaskPresenter } from '../../core/ports/TaskPresenter';

interface TasksContextProps {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export class ReactTaskPresenter implements TaskPresenter {
  constructor(
    private setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    private setError: React.Dispatch<React.SetStateAction<Error | null>>
  ) {}

  displayTasks(tasks: Task[]): void {
    this.setTasks(tasks);
  }

  displayError(error: Error): void {
    this.setError(error);
  }
}

export const TasksProvider: React.FC<{
  children: React.ReactNode;
  taskService: TaskService;
}> = ({ children, taskService }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const presenter = new ReactTaskPresenter(setTasks, setError);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const allTasks = await taskService.getAllTasks();
        presenter.displayTasks(allTasks);
      } catch (e) {
        presenter.displayError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [taskService]);

  const addTask = async (title: string) => {
    try {
      const newTask = await taskService.createTask(title);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (e) {
      setError(e as Error);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const updatedTask = await taskService.toggleTaskStatus(id);
      if (updatedTask) {
        setTasks(prevTasks => 
          prevTasks.map(task => task.id === id ? updatedTask : task)
        );
      }
    } catch (e) {
      setError(e as Error);
    }
  };

  const removeTask = async (id: string) => {
    try {
      const success = await taskService.deleteTask(id);
      if (success) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      }
    } catch (e) {
      setError(e as Error);
    }
  };

  return (
    <TasksContext.Provider value={{ 
      tasks, loading, error, addTask, toggleTask, removeTask 
    }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }
  return context;
};
