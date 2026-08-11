"use client";

import { useState, useMemo, useEffect } from "react";
import type { TaskFilters as TaskFiltersType } from "core";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { UseTasksReturn } from "../hooks/useTasks";
import styles from "../styles/TaskPage.module.css";

type TaskPageProps = {
  useTasks: (filters?: TaskFiltersType) => UseTasksReturn;
};

export function TaskPage({ useTasks }: TaskPageProps) {
  const [title, setTitle] = useState("");
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(undefined);
  const [completedFilter, setCompletedFilter] = useState<boolean | undefined>(undefined);
  const [sortFilter, setSortFilter] = useState<string | undefined>(undefined);
  const [limitFilter, setLimitFilter] = useState<number | undefined>(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

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
    limit: limitFilter,
  }), [searchFilter, completedFilter, sortFilter, limitFilter]);

  const { 
    tasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    hasMore,
    loadMore,
    loading,
  } = useTasks(filters);

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask(title);
    setTitle("");
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
        limit={limitFilter}
        setLimit={setLimitFilter}
      />

      <TaskForm title={title} setTitle={setTitle} addTask={addTask} />

      <hr className={styles.section} />

      {loading && tasks.length === 0 && (
        <p className={styles.loading}>Chargement...</p>
      )}

      <TaskList tasks={tasks} onDelete={confirmDelete} onUpdate={updateTask} />

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={loadMore}
            disabled={loading}
            className={styles.loadMoreButton}
          >
            {loading ? "Chargement..." : "Afficher plus"}
          </button>
        </div>
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
    </main>
  );
}