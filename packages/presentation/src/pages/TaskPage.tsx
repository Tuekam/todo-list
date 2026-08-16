"use client";

import { useState, useMemo, useEffect } from "react";
import type { TaskFilters as TaskFiltersType } from "core";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import { ConfirmationModal } from "../components/ConfirmationModal";
import Toast from "../components/Toast";
import { UseTasksReturn } from "../hooks/useTasks";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import styles from "../styles/TaskPage.module.css";

type TaskPageProps = {
  useTasks: (filters?: TaskFiltersType) => UseTasksReturn;
};

export function TaskPage({ useTasks }: TaskPageProps) {
  const [title, setTitle] = useState("");
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(undefined);
  const [completedFilter, setCompletedFilter] = useState<boolean | undefined>(undefined);
  const [sortFilter, setSortFilter] = useState<string | undefined>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [limitFilter, setLimitFilter] = useState<number | undefined>(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      setSearchFilter(searchInput?.trim() || undefined);
    }, 300);
    return () => clearTimeout(handle);
  }, [searchInput]);

  const filters = useMemo(() => ({
    search: searchFilter,
    completed: completedFilter,
    sort: sortFilter,
    direction: sortDirection,
    limit: limitFilter,
  }), [searchFilter, completedFilter, sortFilter, sortDirection, limitFilter]);

  const { 
    tasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    hasMore,
    loadMore,
    loading,
  } = useTasks(filters);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loading);

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask(title);
    setTitle("");
    showSuccess("Tâche ajoutée avec succès");
  };

  const confirmDelete = async (id: string) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete);
      setTaskToDelete(null);
      setShowDeleteModal(false);
      showSuccess("Tâche supprimée");
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    await updateTask(id, data);
    if (data.title) showSuccess("Tâche modifiée");
    else if (data.completed !== undefined) {
      showSuccess(data.completed ? "Tâche terminée" : "Tâche réouverte");
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tâches</h1>
        <span className={styles.taskCount}>{tasks.length}</span>
      </div>

      <TaskFilters
        search={searchInput}
        setSearch={setSearchInput}
        completed={completedFilter}
        setCompleted={setCompletedFilter}
        sort={sortFilter}
        setSort={setSortFilter}
        direction={sortDirection}
        setDirection={setSortDirection}
        limit={limitFilter}
        setLimit={setLimitFilter}
      />

      <TaskForm title={title} setTitle={setTitle} addTask={addTask} />

      <hr className={styles.section} />

      {loading && tasks.length === 0 && (
        <p className={styles.loading}>Chargement...</p>
      )}

      <TaskList tasks={tasks} onDelete={confirmDelete} onUpdate={handleUpdate} />

      {hasMore && (
        <div ref={sentinelRef} style={{ height: 20, margin: 10 }} />
      )}

      {loading && tasks.length > 0 && (
        <p className={styles.loadingMore}>Chargement de plus de tâches...</p>
      )}

      {!hasMore && tasks.length > 0 && (
        <p className={styles.allLoaded}>Toutes les tâches sont affichées</p>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message="Cette action est irréversible. Êtes-vous certain de vouloir supprimer cette tâche ?"
      />

      {successMessage && (
        <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}
    </main>
  );
}