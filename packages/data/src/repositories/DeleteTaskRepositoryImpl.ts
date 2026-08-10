import { doc, deleteDoc, Firestore } from "firebase/firestore";
import { DeleteTaskRepository } from "core";

export class TaskDeleteRepositoryImpl implements DeleteTaskRepository {
  private db: Firestore;

  constructor({ db }: { db: Firestore }) {
    this.db = db;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.db, "tasks", id);
    await deleteDoc(docRef);
  }
}