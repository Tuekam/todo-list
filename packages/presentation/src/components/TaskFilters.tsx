"use client";

import styles from "../styles/TaskFilters.module.css";

type TaskFiltersProps = {
  search: string | undefined;
  setSearch: (value: string | undefined) => void;
  completed: boolean | undefined;
  setCompleted: (value: boolean | undefined) => void;
  sort: string | undefined;
  setSort: (value: string | undefined) => void;
  limit: number | undefined;
  setLimit: (value: number | undefined) => void;
};

export default function TaskFilters({
  search,
  setSearch,
  completed,
  setCompleted,
  sort,
  setSort,
  limit,
  setLimit,
}: TaskFiltersProps) {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={search || ""}
        onChange={(e) => setSearch(e.target.value || undefined)}
        className={styles.searchInput}
      />

      <select
        value={completed === undefined ? "" : String(completed)}
        onChange={(e) => {
          const value = e.target.value;
          setCompleted(value === "" ? undefined : value === "true");
        }}
        className={styles.select}
      >
        <option value="">Toutes</option>
        <option value="true">Terminées</option>
        <option value="false">En cours</option>
      </select>

      <select
        value={sort || ""}
        onChange={(e) => setSort(e.target.value || undefined)}
        className={styles.select}
      >
        <option value="">Trier par...</option>
        <option value="createdAt">Date de création</option>
        <option value="title">Titre</option>
      </select>

      <select
        value={limit || ""}
        onChange={(e) => setLimit(e.target.value ? Number(e.target.value) : undefined)}
        className={styles.select}
      >
        <option value="">Toutes</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}