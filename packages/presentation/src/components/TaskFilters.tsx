"use client";

import styles from "../styles/TaskFilters.module.css";

type TaskFiltersProps = {
  search: string | undefined;
  setSearch: (value: string | undefined) => void;
  completed: boolean | undefined;
  setCompleted: (value: boolean | undefined) => void;
  sort: string | undefined;
  setSort: (value: string | undefined) => void;
  direction: "asc" | "desc";
  setDirection: (value: "asc" | "desc") => void;
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
  direction,
  setDirection,
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
        <option value="">Tous les statuts</option>
        <option value="true">Terminées</option>
        <option value="false">En cours</option>
      </select>

      <div className={styles.sortContainer} style={{ display: 'flex', gap: '4px' }}>
        <select
          value={sort || "createdAt"}
          onChange={(e) => setSort(e.target.value || undefined)}
          className={styles.select}
        >
          <option value="createdAt">Date de création</option>
          <option value="title">Titre</option>
        </select>

        <button
          onClick={() => setDirection(direction === "asc" ? "desc" : "asc")}
          className={styles.select}
          style={{ minWidth: '40px', padding: '0 8px' }}
          title={direction === "asc" ? "Tri croissant" : "Tri décroissant"}
        >
          {direction === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <select
        value={limit || 10}
        onChange={(e) => setLimit(e.target.value ? Number(e.target.value) : undefined)}
        className={styles.select}
      >
        <option value="5">Limite: 5</option>
        <option value="10">Limite: 10</option>
        <option value="20">Limite: 20</option>
      </select>
    </div>
  );
}
