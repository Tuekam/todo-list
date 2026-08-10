import { doc, getDoc, updateDoc, Firestore } from "firebase/firestore";
import { Task, UpdateTaskRepository } from "core";

export class TaskUpdateRepositoryImpl implements UpdateTaskRepository {
  private db: Firestore;

  constructor({ db }: { db: Firestore }) {
    this.db = db;
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const docRef = doc(this.db, "tasks", id);

    const updateData: Record<string, any> = { ...data };
    
    if (data.title !== undefined) {
      updateData.titleLower = data.title.toLowerCase();
    }

    await updateDoc(docRef, updateData);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Tâche non trouvée après mise à jour");
    }

    return { id: docSnap.id, ...docSnap.data() } as Task;
  }
}