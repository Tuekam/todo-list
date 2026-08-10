import type {
  GetTasksRepository,
  CreateTaskRepository,
  UpdateTaskRepository,
  DeleteTaskRepository
} from "../interfaces/TaskRepository";

export interface DIContainer<TUseCases = unknown> {
  getRepository: GetTasksRepository;
  createRepository: CreateTaskRepository;
  updateRepository: UpdateTaskRepository;
  deleteRepository: DeleteTaskRepository;
  taskUseCases: TUseCases;
}