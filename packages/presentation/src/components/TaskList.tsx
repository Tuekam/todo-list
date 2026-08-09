"use client";

import { Task } from "core";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>;
};

export default function TaskList({ tasks, onDelete, onUpdate }: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
}