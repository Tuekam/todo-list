"use client";

import { useTasks } from "@todo-list/presentation";
import { TaskPage } from "@todo-list/presentation";

export default function Home() {
  return <TaskPage useTasks={useTasks} />;
}