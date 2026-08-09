"use client";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 32,
          borderRadius: 12,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: 20, fontWeight: 600, color: "#111827" }}>
          {title}
        </h2>
        <p style={{ fontSize: 16, color: "#374151", marginBottom: 24 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              backgroundColor: "#f3f4f6",
              color: "#374151",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 20px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}