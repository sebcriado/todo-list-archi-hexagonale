import { Task } from '../domain/Task';

export interface TaskPresenter {
  displayTasks(tasks: Task[]): void;
  displayError(error: Error): void;
}
