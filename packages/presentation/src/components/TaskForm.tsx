"use client";

import styles from "../styles/TaskForm.module.css";

type TaskFormProps = {
  title: string;
  setTitle: (value: string) => void;
  addTask: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function TaskForm({ title, setTitle, addTask }: TaskFormProps) {
  return (
    <form onSubmit={addTask} className={styles.form}>
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.submitButton}>
        Ajouter
      </button>
    </form>
  );
}