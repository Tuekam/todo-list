"use client";

import { useState, useMemo, useEffect } from "react";
import type { TaskFilters as TaskFiltersType } from "core";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { UseTasksReturn } from "../hooks/useTasks";

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
    <main style={{ padding: 30 }}>
      <h1>Todo List</h1>

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

      <hr style={{ margin: "20px 0" }} />

      <TaskForm title={title} setTitle={setTitle} addTask={addTask} />

      <hr style={{ margin: "20px 0" }} />

      <TaskList tasks={tasks} onDelete={confirmDelete} onUpdate={updateTask} />

      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <button
            onClick={loadMore}
            style={{
              padding: "10px 24px",
              backgroundColor: "#4f4d4d",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Charger plus
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible."
      />
    </main>
  );
}