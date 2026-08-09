import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DeleteTaskRepository } from "core";

export class TaskDeleteRepositoryImpl implements DeleteTaskRepository {
  async delete(id: string): Promise<void> {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }
}