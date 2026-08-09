"use client";

import { useState, useMemo } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import { ConfirmationModal } from "../components/ConfirmationModal";

type TaskPageProps = {
  useTasks: (filters?: any) => any;
};

export function TaskPage({ useTasks }: TaskPageProps) {
  const [title, setTitle] = useState("");
  const [completedFilter, setCompletedFilter] = useState<boolean | undefined>(undefined);
  const [sortFilter, setSortFilter] = useState<string | undefined>(undefined);
  const [limitFilter, setLimitFilter] = useState<number | undefined>(5);
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const filters = useMemo(() => ({
    completed: completedFilter,
    sort: sortFilter,
    limit: limitFilter,
    page: page,
  }), [completedFilter, sortFilter, limitFilter, page]);

  const { tasks, createTask, updateTask, deleteTask, total, totalPages } = useTasks(filters);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main style={{ padding: 30 }}>
      <h1>Todo List</h1>

      <TaskFilters
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

      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "center" }}>
          <button 
            onClick={() => handlePageChange(page - 1)} 
            disabled={page === 1}
          >
            ← Précédent
          </button>
          <span>Page {page} sur {totalPages} ({total} tâches)</span>
          <button 
            onClick={() => handlePageChange(page + 1)} 
            disabled={page === totalPages}
          >
            Suivant →
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