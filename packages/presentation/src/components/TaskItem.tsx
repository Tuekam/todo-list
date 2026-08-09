"use client";

import { useState } from "react";
import { Task } from "core";

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

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
      {isEditing ? (
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            style={{ flex: 1, padding: 4, fontSize: 16 }}
          />
          <button onClick={saveEdit}>Enregistrer</button>
          <button onClick={cancelEdit}>Annuler</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
          <span style={{ flex: 1 }}>{task.title}</span>
          <button onClick={startEditing}>Modifier</button>
          <button onClick={() => onDelete(task.id)}>Supprimer</button>
        </div>
      )}
    </div>
  );
}