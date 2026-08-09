import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Task, CreateTaskRepository } from "core";

export class TaskCreateRepositoryImpl implements CreateTaskRepository {
  async create(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const docData: Record<string, any> = {
      title: task.title,
      completed: task.completed,
      createdAt: new Date(),
    };
    
    if (task.category) {
      docData.category = task.category;
    }

    const docRef = await addDoc(collection(db, "tasks"), docData);

    return {
      id: docRef.id,
      ...task,
      createdAt: new Date(),
    };
  }
}