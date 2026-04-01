"use client";

import { WindowState } from "./Desktop";
import StartMenu from "./StartMenu";

interface Props {
  clock: string;
  openWindows: WindowState[];
  activeTab: string | null;
  startOpen: boolean;
  onStartClick: (e: React.MouseEvent) => void;
  onTaskbarItem: (id: string) => void;
  onStartMenuItem: (id: string) => void;
}

export default function Taskbar({
  clock,
  openWindows,
  activeTab,
  startOpen,
  onStartClick,
  onTaskbarItem,
  onStartMenuItem,
}: Props) {
  return (
    <div
      className="win-taskbar fixed bottom-0 left-0 right-0 z-[9999]"
      style={{ height: "30px" }}
    >
      {/* Start menu */}
      {startOpen && (
        <StartMenu
          onSelect={onStartMenuItem}
          onClose={() => {}}
        />
      )}

      {/* Start button */}
      <button
        className="win-start-btn"
        onClick={onStartClick}
        style={{ height: "22px", fontSize: "11px" }}
      >
        <span style={{ fontSize: "13px" }}>⊞</span>
        <strong>Start</strong>
      </button>

      {/* Separator */}
      <div className="win-sep" />

      {/* Taskbar items */}
      <div className="flex items-center gap-1 flex-1 overflow-hidden">
        {openWindows.map((win) => (
          <button
            key={win.id}
            className={`win-btn text-left overflow-hidden whitespace-nowrap`}
            style={{
              height: "22px",
              minWidth: "80px",
              maxWidth: "160px",
              fontSize: "11px",
              ...(win.id === activeTab && !win.minimized
                ? {
                    borderTop: "2px solid #808080",
                    borderLeft: "2px solid #808080",
                    borderRight: "2px solid #ffffff",
                    borderBottom: "2px solid #ffffff",
                    background: "#d4d0c8",
                  }
                : {}),
            }}
            onClick={() => onTaskbarItem(win.id)}
          >
            {win.title}
          </button>
        ))}
      </div>

      {/* System tray */}
      <div className="win-clock ml-auto" style={{ whiteSpace: "nowrap" }}>
        🔊 {clock}
      </div>
    </div>
  );
}
