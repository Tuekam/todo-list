import type { Firestore } from "firebase/firestore";
import type { DIContainer, TaskUseCase } from "core"; 

export type AppCradle = DIContainer<TaskUseCase> & {
  db: Firestore;
};