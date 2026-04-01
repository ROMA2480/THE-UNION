"use client";

import { useState, useEffect } from "react";
import Taskbar from "./Taskbar";
import DesktopIcon from "./DesktopIcon";
import WindowMyComputer from "../windows/WindowMyComputer";
import WindowIE from "../windows/WindowIE";
import WindowNotepad from "../windows/WindowNotepad";
import WindowAbout from "../windows/WindowAbout";
import WindowRecycleBin from "../windows/WindowRecycleBin";

export type WindowId = "my-computer" | "ie" | "notepad" | "about" | "recycle-bin" | null;

export interface WindowState {
  id: string;
  title: string;
  minimized: boolean;
  focused: boolean;
  zIndex: number;
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [zCounter, setZCounter] = useState(100);
  const [clock, setClock] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setClock(`${h}:${m}`);
    };
    updateClock();
    const t = setInterval(updateClock, 10000);
    return () => clearInterval(t);
  }, []);

  const openWindow = (id: string, title: string) => {
    setStartOpen(false);
    const existing = openWindows.find((w) => w.id === id);
    if (existing) {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, minimized: false, focused: true, zIndex: zCounter + 1 }
            : { ...w, focused: false }
        )
      );
      setZCounter((z) => z + 1);
      setActiveTab(id);
      return;
    }
    setZCounter((z) => z + 1);
    setOpenWindows((prev) => [
      ...prev.map((w) => ({ ...w, focused: false })),
      { id, title, minimized: false, focused: true, zIndex: zCounter + 1 },
    ]);
    setActiveTab(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveTab(null);
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true, focused: false } : w))
    );
    setActiveTab(null);
  };

  const focusWindow = (id: string) => {
    setZCounter((z) => z + 1);
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, focused: true, minimized: false, zIndex: zCounter + 1 }
          : { ...w, focused: false }
      )
    );
    setActiveTab(id);
  };

  const taskbarClickWindow = (id: string) => {
    const win = openWindows.find((w) => w.id === id);
    if (!win) return;
    if (win.focused && !win.minimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const desktopIcons = [
    { id: "my-computer", label: "My Computer", icon: "🖥️" },
    { id: "ie", label: "Internet Explorer", icon: "🌐" },
    { id: "notepad", label: "Notepad", icon: "📄" },
    { id: "recycle-bin", label: "Recycle Bin", icon: "🗑️" },
    { id: "about", label: "About Windows", icon: "ℹ️" },
  ];

  const windowTitles: Record<string, string> = {
    "my-computer": "My Computer",
    ie: "Microsoft Internet Explorer",
    notepad: "Untitled - Notepad",
    about: "About Windows 2000",
    "recycle-bin": "Recycle Bin",
  };

  return (
    <div
      className="relative flex flex-col"
      style={{ minHeight: "100vh", background: "#008080", overflow: "hidden" }}
      onClick={() => setStartOpen(false)}
    >
      {/* Desktop icons */}
      <div className="flex flex-col flex-wrap gap-1 p-3 absolute top-0 left-0" style={{ maxHeight: "calc(100vh - 38px)" }}>
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onDoubleClick={() => openWindow(icon.id, windowTitles[icon.id])}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((win) => {
        if (win.minimized) return null;
        const props = {
          key: win.id,
          focused: win.focused,
          zIndex: win.zIndex,
          onClose: () => closeWindow(win.id),
          onMinimize: () => minimizeWindow(win.id),
          onFocus: () => focusWindow(win.id),
        };
        if (win.id === "my-computer") return <WindowMyComputer {...props} />;
        if (win.id === "ie") return <WindowIE {...props} />;
        if (win.id === "notepad") return <WindowNotepad {...props} />;
        if (win.id === "about") return <WindowAbout {...props} />;
        if (win.id === "recycle-bin") return <WindowRecycleBin {...props} />;
        return null;
      })}

      {/* Taskbar */}
      <Taskbar
        clock={clock}
        openWindows={openWindows}
        activeTab={activeTab}
        startOpen={startOpen}
        onStartClick={(e) => {
          e.stopPropagation();
          setStartOpen((s) => !s);
        }}
        onTaskbarItem={taskbarClickWindow}
        onStartMenuItem={(id) => openWindow(id, windowTitles[id] || id)}
      />
    </div>
  );
}
