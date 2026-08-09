import { TaskUseCases } from '@todo-list/domain';
import {
  TaskGetRepositoryImpl,
  TaskCreateRepositoryImpl,
  TaskUpdateRepositoryImpl,
  TaskDeleteRepositoryImpl,
} from '@todo-list/data';

// Définir les types des dépendances
export interface DIContainer {
  getRepository: TaskGetRepositoryImpl;
  createRepository: TaskCreateRepositoryImpl;
  updateRepository: TaskUpdateRepositoryImpl;
  deleteRepository: TaskDeleteRepositoryImpl;
  taskUseCases: TaskUseCases;
}

// Clés pour le container
export const DI_KEYS = {
  GET_REPOSITORY: 'getRepository',
  CREATE_REPOSITORY: 'createRepository',
  UPDATE_REPOSITORY: 'updateRepository',
  DELETE_REPOSITORY: 'deleteRepository',
  TASK_USE_CASES: 'taskUseCases',
} as const;