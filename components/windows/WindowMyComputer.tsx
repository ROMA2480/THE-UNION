"use client";

import DraggableWindow from "./DraggableWindow";

interface Props {
  focused: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

const drives = [
  { icon: "💿", label: "3½ Floppy (A:)", detail: "0 KB free", type: "Floppy" },
  { icon: "💿", label: "Local Disk (C:)", detail: "12.4 GB free", type: "Local Disk" },
  { icon: "💿", label: "Local Disk (D:)", detail: "4.2 GB free", type: "Local Disk" },
  { icon: "📀", label: "CD-ROM (E:)", detail: "", type: "CD-ROM Drive" },
];

const folders = [
  { icon: "🖨️", label: "Printers" },
  { icon: "🕹️", label: "Control Panel" },
  { icon: "🌐", label: "Network" },
  { icon: "👤", label: "My Documents" },
];

export default function WindowMyComputer({ focused, zIndex, onClose, onMinimize, onFocus }: Props) {
  const menuBar = (
    <>
      {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
        <span key={m} className="win-menu-item">{m}</span>
      ))}
    </>
  );

  const toolBar = (
    <>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>◀ Back</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px", opacity: 0.5 }}>▶ Forward</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>⬆ Up</button>
      <div className="win-sep" />
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>🔍 Search</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>📁 Folders</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>📜 History</button>
      <div className="win-sep" />
      <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
        <span style={{ fontSize: "11px", whiteSpace: "nowrap" }}>Address</span>
        <input
          className="win-address"
          defaultValue="My Computer"
          style={{ flex: 1 }}
          readOnly
        />
        <button className="win-btn" style={{ padding: "1px 8px", fontSize: "11px" }}>Go</button>
      </div>
    </>
  );

  const statusBar = (
    <>
      <span className="win-statusbar-panel" style={{ flex: 1 }}>
        {drives.length + folders.length} object(s)
      </span>
      <span className="win-statusbar-panel">My Computer</span>
    </>
  );

  return (
    <DraggableWindow
      title="My Computer"
      icon="🖥️"
      focused={focused}
      zIndex={zIndex}
      defaultWidth={520}
      defaultHeight={380}
      defaultX={80}
      defaultY={60}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      menuBar={menuBar}
      toolBar={toolBar}
      statusBar={statusBar}
    >
      <div
        className="win-explorer-content"
        style={{ height: "100%", overflowY: "auto", padding: "8px" }}
      >
        {/* Drives section */}
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#000080",
              fontWeight: "bold",
              borderBottom: "1px solid #316ac5",
              marginBottom: "6px",
              paddingBottom: "2px",
            }}
          >
            Hard Disk Drives
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {drives.slice(1, 3).map((d) => (
              <div
                key={d.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "80px",
                  padding: "6px",
                  cursor: "default",
                  fontSize: "11px",
                  gap: "4px",
                }}
                className="hover:bg-[#316ac5] hover:text-white group"
              >
                <span style={{ fontSize: "32px" }}>{d.icon}</span>
                <span style={{ textAlign: "center", lineHeight: "1.2", wordBreak: "break-word" }}>{d.label}</span>
                <div
                  className="win-progress-track"
                  style={{ width: "64px", height: "8px" }}
                >
                  <div
                    className="win-progress-fill"
                    style={{ width: "60%", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Removable section */}
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#000080",
              fontWeight: "bold",
              borderBottom: "1px solid #316ac5",
              marginBottom: "6px",
              paddingBottom: "2px",
            }}
          >
            Devices with Removable Storage
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {[drives[0], drives[3]].map((d) => (
              <div
                key={d.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "80px",
                  padding: "6px",
                  cursor: "default",
                  fontSize: "11px",
                  gap: "4px",
                }}
                className="hover:bg-[#316ac5] hover:text-white"
              >
                <span style={{ fontSize: "32px" }}>{d.icon}</span>
                <span style={{ textAlign: "center", lineHeight: "1.2", wordBreak: "break-word" }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other section */}
        <div>
          <div
            style={{
              fontSize: "11px",
              color: "#000080",
              fontWeight: "bold",
              borderBottom: "1px solid #316ac5",
              marginBottom: "6px",
              paddingBottom: "2px",
            }}
          >
            Other
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {folders.map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "80px",
                  padding: "6px",
                  cursor: "default",
                  fontSize: "11px",
                  gap: "4px",
                }}
                className="hover:bg-[#316ac5] hover:text-white"
              >
                <span style={{ fontSize: "32px" }}>{f.icon}</span>
                <span style={{ textAlign: "center", lineHeight: "1.2" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DraggableWindow>
  );
}
