"use client";

import { Task } from "core";
import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.css";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>;
};

export default function TaskList({ tasks, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Aucune tâche à afficher</p>;
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}