"use client";

import { useState } from "react";
import { Task } from "core";
import styles from "../styles/TaskItem.module.css";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>;
};

export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const startEditing = () => {
    setEditTitle(task.title);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    if (editTitle.trim()) {
      await onUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const toggleComplete = async () => {
    await onUpdate(task.id, { completed: !task.completed });
  };

  return (
    <div className={styles.item}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            className={styles.editInput}
          />
          <button onClick={saveEdit} className={styles.saveButton}>
            Enregistrer
          </button>
          <button onClick={cancelEdit} className={styles.cancelButton}>
            Annuler
          </button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className={styles.checkbox}
          />
          <span className={`${styles.title} ${task.completed ? styles.completed : ""}`}>
            {task.title}
          </span>
          <div className={styles.actions}>
            <button onClick={startEditing} className={styles.editButton}>
              Modifier
            </button>
            <button onClick={() => onDelete(task.id)} className={styles.deleteButton}>
              Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
}