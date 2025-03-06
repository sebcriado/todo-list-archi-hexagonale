import { Task } from '../domain/Task';

export interface TaskRepository {
  findAllTasks(): Promise<Task[]>;
  findTaskById(id: string): Promise<Task | null>;
  saveTask(task: Task): Promise<Task>;
  deleteTask(id: string): Promise<boolean>;
}
