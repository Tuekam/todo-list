import { Task } from "../models/TaskModel";

export interface TaskFilters {
  completed?: boolean;
  search?: string;
  sort?: string;
  direction?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetTasksRepository {
  getAll(filters?: TaskFilters): Promise<PaginatedResult<Task>>;
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