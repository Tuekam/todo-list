"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, TaskFilters, PaginatedResult } from "core";

type TaskUseCases = {
  getTasks: (filters?: TaskFilters) => Promise<PaginatedResult<Task>>;
  createTask: (title: string, category?: string) => Promise<Task>;
  updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
};

type UseTasksReturn = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  createTask: (title: string, category?: string) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reload: () => Promise<void>;
};

export function useTasksFactory(taskUseCases: TaskUseCases) {
  return function useTasks(filters?: TaskFilters): UseTasksReturn {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const loadTasks = useCallback(async () => {
      try {
        setLoading(true);
        const data = await taskUseCases.getTasks(filters);
        setTasks(data.items || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 0);
        setCurrentPage(data.page || 1);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        setError(message);
      } finally {
        setLoading(false);
      }
    }, [filters]);

    useEffect(() => {
      loadTasks();
    }, [loadTasks]);

    const createTask = async (title: string, category?: string) => {
      try {
        await taskUseCases.createTask(title, category);
        await loadTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    };

    const updateTask = async (id: string, data: Partial<Task>) => {
      try {
        await taskUseCases.updateTask(id, data);
        await loadTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    };

    const deleteTask = async (id: string) => {
      try {
        await taskUseCases.deleteTask(id);
        await loadTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    };

    return {
      tasks,
      loading,
      error,
      total,
      totalPages,
      currentPage,
      createTask,
      updateTask,
      deleteTask,
      reload: loadTasks,
    };
  };
}