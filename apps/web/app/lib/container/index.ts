import { createContainer, asClass, InjectionMode } from 'awilix';

let containerInstance: any = null;

function createContainerInstance() {
  // Importer les classes à l'intérieur de la fonction
  const { TaskUseCases } = require('@todo-list/domain');
  const {
    TaskGetRepositoryImpl,
    TaskCreateRepositoryImpl,
    TaskUpdateRepositoryImpl,
    TaskDeleteRepositoryImpl,
  } = require('@todo-list/data');

  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.register({
    getRepository: asClass(TaskGetRepositoryImpl).singleton(),
    createRepository: asClass(TaskCreateRepositoryImpl).singleton(),
    updateRepository: asClass(TaskUpdateRepositoryImpl).singleton(),
    deleteRepository: asClass(TaskDeleteRepositoryImpl).singleton(),
    taskUseCases: asClass(TaskUseCases).singleton(),
  });

  return container;
}

export function getContainer() {
  if (!containerInstance) {
    containerInstance = createContainerInstance();
  }
  return containerInstance;
}

// Exporter une instance par défaut
const container = getContainer();
export default container;