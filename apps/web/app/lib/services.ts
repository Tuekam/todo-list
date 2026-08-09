import type { TaskUseCases } from '@todo-list/domain';

let taskUseCasesInstance: TaskUseCases | null = null;

export async function getTaskUseCases(): Promise<TaskUseCases> {
  if (!taskUseCasesInstance) {
    // Utiliser import() dynamique pour charger seulement à l'exécution
    const container = (await import('./container')).default;
    taskUseCasesInstance = container.resolve('taskUseCases');
  }
  return taskUseCasesInstance as TaskUseCases;
}