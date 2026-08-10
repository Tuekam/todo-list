import { Task } from "../models/TaskModel";
import { TaskFilters, TaskResult } from "./TaskRepository";

export interface TaskUseCase {
  getTasks(filters?: TaskFilters): Promise<TaskResult>;
  createTask(title: string, category?: string): Promise<Task>;
  updateTask(id: string, data: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}