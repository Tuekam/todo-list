import type { TaskUseCase } from 'core'; 
import { resolveTaskUseCases } from './container';

let taskUseCasesInstance: TaskUseCase | null = null;

export async function getTaskUseCases(): Promise<TaskUseCase> {
  if (!taskUseCasesInstance) {
    taskUseCasesInstance = resolveTaskUseCases();
  }
  return taskUseCasesInstance;
}