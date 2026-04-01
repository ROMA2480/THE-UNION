"use client";

interface Props {
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function StartMenu({ onSelect }: Props) {
  const items = [
    { id: "my-computer", icon: "🖥️", label: "My Computer" },
    { id: "ie", icon: "🌐", label: "Internet Explorer" },
    { id: "notepad", icon: "📄", label: "Notepad" },
    { id: "recycle-bin", icon: "🗑️", label: "Recycle Bin" },
    { id: "about", icon: "ℹ️", label: "About Windows" },
  ];

  return (
    <div
      className="absolute bottom-[30px] left-0 win-window"
      style={{ width: "200px", zIndex: 10000 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Title banner */}
      <div
        style={{
          background: "linear-gradient(to bottom, #1c60c8, #1952a6)",
          color: "white",
          padding: "8px 10px 6px",
          display: "flex",
          alignItems: "flex-end",
          gap: "6px",
          minHeight: "54px",
          fontWeight: "bold",
          fontSize: "14px",
          letterSpacing: "1px",
          fontStyle: "italic",
          borderBottom: "2px solid #0a2280",
        }}
      >
        <span style={{ fontSize: "20px", fontStyle: "normal" }}>⊞</span>
        Windows<span style={{ fontWeight: "300", fontSize: "14px" }}>2000</span>
      </div>

      {/* Menu items */}
      <div style={{ padding: "2px 0" }}>
        {items.map((item) => (
          <button
            key={item.id}
            className="win-context-item w-full text-left flex items-center gap-2"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            onClick={() => onSelect(item.id)}
          >
            <span style={{ fontSize: "16px", width: "20px" }}>{item.icon}</span>
            <span style={{ fontSize: "11px" }}>{item.label}</span>
          </button>
        ))}

        <div style={{ borderTop: "1px solid #808080", margin: "2px 0" }} />

        <button
          className="win-context-item w-full text-left flex items-center gap-2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => {}}
        >
          <span style={{ fontSize: "16px", width: "20px" }}>⚙️</span>
          <span style={{ fontSize: "11px" }}>Settings</span>
        </button>

        <button
          className="win-context-item w-full text-left flex items-center gap-2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => {}}
        >
          <span style={{ fontSize: "16px", width: "20px" }}>🔌</span>
          <span style={{ fontSize: "11px" }}>Shut Down...</span>
        </button>
      </div>
    </div>
  );
}
