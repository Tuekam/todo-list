import { 
  collection, getDocs, query, where, orderBy, limit,
  QueryConstraint, startAfter, documentId, getDoc, doc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Task, GetTasksRepository, TaskFilters, PaginatedResult } from "core";

export class TaskGetRepositoryImpl implements GetTasksRepository {
  async getAll(filters?: TaskFilters): Promise<PaginatedResult<Task>> {
    const constraints: QueryConstraint[] = [];

    if (filters?.completed !== undefined) {
      constraints.push(where("completed", "==", filters.completed));
    }

    const validSortFields = ["createdAt", "title"];
    if (filters?.sort && validSortFields.includes(filters.sort)) {
      constraints.push(
        orderBy(
          filters.sort,
          filters.direction === "desc" ? "desc" : "asc"
        )
      );
    } else {
      constraints.push(orderBy("createdAt", "desc"));
    }

    const limitValue = filters?.limit || 10;
    const page = filters?.page || 1;

    let q = query(collection(db, "tasks"), ...constraints);

    const allDocs = await getDocs(q);
    const allItems = allDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Task));

    const total = allItems.length;
    const totalPages = Math.ceil(total / limitValue);

    const startIndex = (page - 1) * limitValue;
    const endIndex = startIndex + limitValue;

    const items = allItems.slice(startIndex, endIndex);

    return {
      items,
      total,
      page,
      limit: limitValue,
      totalPages,
    };
  }
}