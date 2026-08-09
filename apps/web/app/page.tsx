"use client";

import { useTasks } from "./lib/hooks";
import { TaskPage } from "@todo-list/presentation";

export default function Home() {
  return <TaskPage useTasks={useTasks} />;
}