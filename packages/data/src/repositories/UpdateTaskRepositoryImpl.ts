import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Task, UpdateTaskRepository } from "core";

export class TaskUpdateRepositoryImpl implements UpdateTaskRepository {
  async update(id: string, data: Partial<Task>): Promise<Task> {
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, data);
    
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("Tâche non trouvée après mise à jour");
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Task;
  }
}