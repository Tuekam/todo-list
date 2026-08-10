import { Task } from "../models/TaskModel";

export interface TaskFilters {
  completed?: boolean;
  search?: string;
  sort?: string;
  direction?: "asc" | "desc";
  limit?: number;
  lastDocId?: string; 
}

export interface TaskResult {
  items: Task[];
  nextCursor?: string; 
  hasMore: boolean;
}

export interface GetTasksRepository {
  getAll(filters?: TaskFilters): Promise<TaskResult>;
}

export interface CreateTaskRepository {
  create(task: Omit<Task, "id" | "createdAt">): Promise<Task>;
}

export interface UpdateTaskRepository {
  update(id: string, data: Partial<Task>): Promise<Task>;
}

export interface DeleteTaskRepository {
  delete(id: string): Promise<void>;
}