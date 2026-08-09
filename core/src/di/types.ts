import type { 
  GetTasksRepository, 
  CreateTaskRepository, 
  UpdateTaskRepository, 
  DeleteTaskRepository 
} from "../interfaces/TaskRepository";

// Interface simplifiée pour le container
export interface DIContainer {
  getRepository: GetTasksRepository;
  createRepository: CreateTaskRepository;
  updateRepository: UpdateTaskRepository;
  deleteRepository: DeleteTaskRepository;
  taskUseCases: any; // On utilisera 'any' pour éviter les problèmes de type
}

export const DI_KEYS = {
  GET_REPOSITORY: 'getRepository',
  CREATE_REPOSITORY: 'createRepository',
  UPDATE_REPOSITORY: 'updateRepository',
  DELETE_REPOSITORY: 'deleteRepository',
  TASK_USE_CASES: 'taskUseCases',
} as const;