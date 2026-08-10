import {
  collection, getDocs, query, where, orderBy,
  QueryConstraint, Firestore, limit, startAfter, doc, getDoc,
  QueryDocumentSnapshot, DocumentData
} from "firebase/firestore";
import { Task, GetTasksRepository, TaskFilters, TaskResult } from "core";

export class TaskGetRepositoryImpl implements GetTasksRepository {
  private db: Firestore;

  constructor({ db }: { db: Firestore }) {
    this.db = db;
  }

  async getAll(filters?: TaskFilters): Promise<TaskResult> {
    const constraints: QueryConstraint[] = [];

    if (filters?.completed !== undefined) {
      constraints.push(where("completed", "==", filters.completed));
    }

    const hasSearch = !!filters?.search && filters.search.trim() !== "";
    const limitValue = filters?.limit || 10;

    if (hasSearch) {
      const needle = filters!.search!.trim().toLowerCase();
      constraints.push(where("titleLower", ">=", needle));
      constraints.push(where("titleLower", "<=", needle + "\uf8ff"));
      constraints.push(orderBy("titleLower", "asc"));
    } else {
      const validSortFields = ["createdAt", "title"];
      if (filters?.sort && validSortFields.includes(filters.sort)) {
        constraints.push(
          orderBy(filters.sort, filters.direction === "desc" ? "desc" : "asc")
        );
      } else {
        constraints.push(orderBy("createdAt", "desc"));
      }
    }

    const fetchLimit = limitValue + 1;
    constraints.push(limit(fetchLimit));

    if (filters?.lastDocId) {
      const lastDocRef = doc(this.db, "tasks", filters.lastDocId);
      const lastDocSnap = await getDoc(lastDocRef);
      if (lastDocSnap.exists()) {
        constraints.push(startAfter(lastDocSnap));
      }
    }

    const q = query(collection(this.db, "tasks"), ...constraints);
    const snapshot = await getDocs(q);

    const items: Task[] = [];
    let hasMore = false;

    snapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>, index: number) => {
      if (index >= limitValue) {
        hasMore = true;
        return; 
      }
      items.push({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as Task);
    });

    let nextCursor: string | undefined;

    if (hasMore && items.length > 0) {
      const lastItem = items[items.length - 1];
      nextCursor = lastItem.id;
    }

    return {
      items,
      nextCursor,
      hasMore,
    };
  }
}