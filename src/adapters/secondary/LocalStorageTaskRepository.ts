import { Task } from '../../core/domain/Task';
import { TaskRepository } from '../../core/ports/TaskRepository';

export class LocalStorageTaskRepository implements TaskRepository {
  private storageKey = 'tasks';

  // Méthode auxiliaire pour récupérer les tâches du localStorage
  private getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    if (!tasksJson) return [];
    
    const tasks = JSON.parse(tasksJson);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  }

  // Méthode auxiliaire pour sauvegarder les tâches dans localStorage
  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  async findAllTasks(): Promise<Task[]> {
    return new Promise<Task[]>(resolve => {
      // Simuler un délai d'opération asynchrone
      setTimeout(() => {
        resolve(this.getTasks());
      }, 100);
    });
  }

  async findTaskById(id: string): Promise<Task | null> {
    return new Promise<Task | null>(resolve => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const task = tasks.find(task => task.id === id) || null;
        resolve(task);
      }, 100);
    });
  }

  async saveTask(task: Task): Promise<Task> {
    return new Promise<Task>(resolve => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const existingIndex = tasks.findIndex(t => t.id === task.id);
        
        if (existingIndex >= 0) {
          // Mise à jour d'une tâche existante
          tasks[existingIndex] = task;
        } else {
          // Ajout d'une nouvelle tâche
          tasks.push(task);
        }
        
        this.saveTasks(tasks);
        resolve(task);
      }, 100);
    });
  }

  async deleteTask(id: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const newTasks = tasks.filter(task => task.id !== id);
        
        if (newTasks.length === tasks.length) {
          // La tâche n'a pas été trouvée
          resolve(false);
        } else {
          this.saveTasks(newTasks);
          resolve(true);
        }
      }, 100);
    });
  }
}
