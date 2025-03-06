import { Task } from '../domain/Task';
import { TaskRepository } from '../ports/TaskRepository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }

  async createTask(title: string): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(), // Génération d'un ID unique
      title,
      completed: false,
      createdAt: new Date()
    };
    return this.taskRepository.saveTask(task);
  }

  async toggleTaskStatus(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) return null;
    
    task.completed = !task.completed;
    return this.taskRepository.saveTask(task);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.deleteTask(id);
  }
}
