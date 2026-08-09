"use client";

type TaskFormProps = {
  title: string;
  setTitle: (value: string) => void;
  addTask: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function TaskForm({ title, setTitle, addTask }: TaskFormProps) {
  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}