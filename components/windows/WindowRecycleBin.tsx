"use client";

import { useState } from "react";
import DraggableWindow from "./DraggableWindow";

interface Props {
  focused: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  deleted: string;
  location: string;
}

const initialFiles: FileItem[] = [
  { id: 1, name: "old_report.doc", type: "Microsoft Word Document", size: "128 KB", deleted: "3/31/2000 2:15 PM", location: "C:\\My Documents" },
  { id: 2, name: "temp_file.txt", type: "Text Document", size: "2 KB", deleted: "3/31/2000 9:01 AM", location: "C:\\Windows\\Temp" },
  { id: 3, name: "backup_image.bmp", type: "Bitmap Image", size: "1.4 MB", deleted: "3/30/2000 6:45 PM", location: "C:\\My Pictures" },
  { id: 4, name: "setup_old.exe", type: "Application", size: "45 MB", deleted: "3/28/2000 11:30 AM", location: "C:\\Downloads" },
  { id: 5, name: "readme.txt", type: "Text Document", size: "8 KB", deleted: "3/28/2000 8:22 AM", location: "C:\\Program Files\\OldApp" },
];

export default function WindowRecycleBin({ focused, zIndex, onClose, onMinimize, onFocus }: Props) {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [selected, setSelected] = useState<number | null>(null);

  const emptyBin = () => {
    if (confirm("Are you sure you want to permanently delete these items?")) {
      setFiles([]);
      setSelected(null);
    }
  };

  const restore = (id: number) => {
    setFiles((f) => f.filter((item) => item.id !== id));
    setSelected(null);
  };

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
      <div className="win-sep" />
      <button
        className="win-btn"
        style={{ padding: "1px 8px", fontSize: "11px", color: files.length === 0 ? "#808080" : "#000" }}
        onClick={emptyBin}
        disabled={files.length === 0}
      >
        🗑️ Empty Recycle Bin
      </button>
      {selected !== null && (
        <button
          className="win-btn"
          style={{ padding: "1px 8px", fontSize: "11px" }}
          onClick={() => restore(selected)}
        >
          ↩️ Restore
        </button>
      )}
    </>
  );

  const statusBar = (
    <>
      <span className="win-statusbar-panel" style={{ flex: 1 }}>
        {files.length} object(s) — {files.length === 0 ? "Empty" : "Contains deleted files"}
      </span>
    </>
  );

  return (
    <DraggableWindow
      title="Recycle Bin"
      icon="🗑️"
      focused={focused}
      zIndex={zIndex}
      defaultWidth={560}
      defaultHeight={300}
      defaultX={160}
      defaultY={180}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      menuBar={menuBar}
      toolBar={toolBar}
      statusBar={statusBar}
    >
      <div style={{ height: "100%", overflowY: "auto", background: "#ffffff" }}>
        {files.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "8px",
              color: "#808080",
              fontSize: "12px",
            }}
          >
            <span style={{ fontSize: "48px" }}>🗑️</span>
            <span>Recycle Bin is empty</span>
          </div>
        ) : (
          <table className="win-listview" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ width: "180px" }}>Name</th>
                <th style={{ width: "160px" }}>Original Location</th>
                <th style={{ width: "140px" }}>Date Deleted</th>
                <th style={{ width: "80px" }}>Type</th>
                <th style={{ width: "70px" }}>Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  style={{
                    background: selected === file.id ? "#316ac5" : "transparent",
                    color: selected === file.id ? "white" : "inherit",
                    cursor: "default",
                  }}
                  onClick={() => setSelected(file.id)}
                  onDoubleClick={() => restore(file.id)}
                >
                  <td style={{ padding: "2px 6px", background: "inherit", color: "inherit" }}>
                    📄 {file.name}
                  </td>
                  <td style={{ padding: "2px 6px", background: "inherit", color: "inherit", fontSize: "11px" }}>
                    {file.location}
                  </td>
                  <td style={{ padding: "2px 6px", background: "inherit", color: "inherit", fontSize: "11px" }}>
                    {file.deleted}
                  </td>
                  <td style={{ padding: "2px 6px", background: "inherit", color: "inherit", fontSize: "11px" }}>
                    {file.type}
                  </td>
                  <td style={{ padding: "2px 6px", background: "inherit", color: "inherit", fontSize: "11px" }}>
                    {file.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DraggableWindow>
  );
}
