import { addDoc, collection, Firestore } from "firebase/firestore";
import { Task, CreateTaskRepository } from "core";

export class TaskCreateRepositoryImpl implements CreateTaskRepository {
  private db: Firestore;

  constructor({ db }: { db: Firestore }) {
    this.db = db;
  }

  async create(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const createdAt = new Date();
    const docData: Record<string, any> = {
      title: task.title,
      titleLower: task.title.toLowerCase(),
      completed: task.completed,
      createdAt: createdAt,
    };

    const docRef = await addDoc(collection(this.db, "tasks"), docData);

    return {
      id: docRef.id,
      title: task.title,
      completed: task.completed,
      createdAt: createdAt,
    };
  }
}
