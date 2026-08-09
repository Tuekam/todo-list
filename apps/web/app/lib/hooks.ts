"use client";

import { useTasksFactory } from "@todo-list/presentation";

const clientTaskUseCases = {
  async getTasks(filters?: any) {
    const params = new URLSearchParams();
    if (filters?.completed !== undefined) params.set("completed", String(filters.completed));
    if (filters?.sort) params.set("sort", filters.sort);
    if (filters?.direction) params.set("direction", filters.direction);
    if (filters?.limit) params.set("limit", String(filters.limit));
    if (filters?.page) params.set("page", String(filters.page));

    const res = await fetch(`/api/tasks?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Erreur fetching tasks");
    const data = await res.json();

    return {
      items: data.items || [],
      total: data.total || 0,
      page: data.page || 1,
      limit: data.limit || 10,
      totalPages: data.totalPages || 0
    };
  },
  async createTask(title: string, category?: string) {
    const res = await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category }),
    });
    if (!res.ok) throw new Error("Erreur creating task");
    return res.json();
  },
  async updateTask(id: string, data: any) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur updating task");
    return res.json();
  },
  async deleteTask(id: string) {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur deleting task");
    return res.json();
  },
};

export const useTasks = useTasksFactory(clientTaskUseCases);