"use client";

type TaskFiltersProps = {
  completed: boolean | undefined;
  setCompleted: (value: boolean | undefined) => void;
  sort: string | undefined;
  setSort: (value: string | undefined) => void;
  limit: number | undefined;
  setLimit: (value: number | undefined) => void;
};

export default function TaskFilters({
  completed,
  setCompleted,
  sort,
  setSort,
  limit,
  setLimit,
}: TaskFiltersProps) {
  return (
    <div style={{ margin: "20px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
      <select
        value={completed === undefined ? "" : String(completed)}
        onChange={(e) => {
          const value = e.target.value;
          setCompleted(value === "" ? undefined : value === "true");
        }}
        style={{ padding: 5, border: "1px solid #ccc", borderRadius: 4 }}
      >
        <option value="">Toutes les tâches</option>
        <option value="true">Terminées</option>
        <option value="false">En cours</option>
      </select>

      <select
        value={sort || ""}
        onChange={(e) => setSort(e.target.value || undefined)}
        style={{ padding: 5, border: "1px solid #ccc", borderRadius: 4 }}
      >
        <option value="">Trier par...</option>
        <option value="createdAt">Date de création</option>
        <option value="title">Titre</option>
      </select>

      <select
        value={limit || ""}
        onChange={(e) => setLimit(e.target.value ? Number(e.target.value) : undefined)}
        style={{ padding: 5, border: "1px solid #ccc", borderRadius: 4 }}
      >
        <option value="">Toutes</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}