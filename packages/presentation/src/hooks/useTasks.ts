"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, TaskFilters, TaskResult } from "core";

export type UseTasksReturn = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  createTask: (title: string, category?: string) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reload: () => Promise<void>;
  loadMore: () => Promise<void>;
};

export function useTasksFactory() {
  const api = {
    getTasks: async (filters?: TaskFilters): Promise<TaskResult> => {
      const params = new URLSearchParams();
      if (filters?.completed !== undefined) params.set("completed", String(filters.completed));
      if (filters?.search) params.set("search", filters.search);
      if (filters?.sort) params.set("sort", filters.sort);
      if (filters?.direction) params.set("direction", filters.direction);
      if (filters?.limit) params.set("limit", String(filters.limit || 10));
      if (filters?.lastDocId) params.set("lastDocId", filters.lastDocId);

      const res = await fetch(`/api/tasks?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Erreur fetching tasks");
      return res.json();
    },

    createTask: async (title: string, category?: string): Promise<Task> => {
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category }),
      });
      if (!res.ok) throw new Error("Erreur creating task");
      return res.json();
    },

    updateTask: async (id: string, data: Partial<Task>): Promise<Task> => {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur updating task");
      return res.json();
    },

    deleteTask: async (id: string): Promise<void> => {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur deleting task");
    },
  };

  return function useTasks(filters?: TaskFilters): UseTasksReturn {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [nextCursor, setNextCursor] = useState<string | undefined>();
    const [currentFilters, setCurrentFilters] = useState(filters);

    const loadTasks = useCallback(async (newFilters?: TaskFilters) => {
      try {
        setLoading(true);
        setTasks([]);
        setNextCursor(undefined);
        
        const data = await api.getTasks(newFilters || filters);
        setTasks(data.items || []);
        setHasMore(data.hasMore || false);
        setNextCursor(data.nextCursor);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }, [filters]);

    const loadMore = useCallback(async () => {
      if (!nextCursor || loading) return;
      
      try {
        setLoading(true);
        const data = await api.getTasks({
          ...currentFilters,
          lastDocId: nextCursor,
        });
        
        setTasks(prev => [...prev, ...(data.items || [])]);
        setHasMore(data.hasMore || false);
        setNextCursor(data.nextCursor);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }, [nextCursor, currentFilters, loading]);

    const reload = useCallback(async () => {
      setTasks([]);
      setNextCursor(undefined);
      await loadTasks(filters);
    }, [filters, loadTasks]);

    useEffect(() => {
      setCurrentFilters(filters);
      loadTasks(filters);
    }, [filters, loadTasks]);

    const createTask = async (title: string, category?: string) => {
      try {
        await api.createTask(title, category);
        await reload();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    };

    const updateTask = async (id: string, data: Partial<Task>) => {
      try {
        await api.updateTask(id, data);
        setTasks(prev => prev.map(task => 
          task.id === id ? { ...task, ...data } : task
        ));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        await reload(); 
      }
    };

    const deleteTask = async (id: string) => {
      try {
        await api.deleteTask(id);
        setTasks(prev => prev.filter(task => task.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        await reload(); 
      }
    };

    return {
      tasks,
      loading,
      error,
      hasMore,
      createTask,
      updateTask,
      deleteTask,
      reload,
      loadMore,
    };
  };
}

export const useTasks = useTasksFactory();