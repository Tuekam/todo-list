import { createContainer, asClass, asValue, AwilixContainer } from "awilix";
import { TaskUseCaseImpl } from "@todo-list/domain";
import type { TaskUseCase } from "core"; 
import {
  TaskGetRepositoryImpl,
  TaskCreateRepositoryImpl,
  TaskUpdateRepositoryImpl,
  TaskDeleteRepositoryImpl,
  db
} from "@todo-list/data";
import type { AppCradle } from "./types";

let containerInstance: AwilixContainer<AppCradle> | null = null;

export function buildContainer(): AwilixContainer<AppCradle> {
  const container = createContainer<AppCradle>();

  container.register({
    db: asValue(db),
    getRepository: asClass(TaskGetRepositoryImpl).singleton(),
    createRepository: asClass(TaskCreateRepositoryImpl).singleton(),
    updateRepository: asClass(TaskUpdateRepositoryImpl).singleton(),
    deleteRepository: asClass(TaskDeleteRepositoryImpl).singleton(),
    taskUseCases: asClass(TaskUseCaseImpl).singleton(),
  });

  return container;
}

export function getContainer(): AwilixContainer<AppCradle> {
  if (!containerInstance) {
    containerInstance = buildContainer();
  }
  return containerInstance;
}

export function resolveTaskUseCases(): TaskUseCase {
  const container = getContainer();
  return container.resolve('taskUseCases');
}

export default getContainer;