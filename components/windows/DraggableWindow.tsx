"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  title: string;
  icon?: string;
  focused: boolean;
  zIndex: number;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  menuBar?: React.ReactNode;
  toolBar?: React.ReactNode;
  statusBar?: React.ReactNode;
  resizable?: boolean;
}

export default function DraggableWindow({
  title,
  icon = "📄",
  focused,
  zIndex,
  defaultWidth = 500,
  defaultHeight = 380,
  defaultX,
  defaultY,
  onClose,
  onMinimize,
  onFocus,
  children,
  menuBar,
  toolBar,
  statusBar,
  resizable = true,
}: Props) {
  const [pos, setPos] = useState({
    x: defaultX ?? Math.max(40, Math.random() * 300),
    y: defaultY ?? Math.max(30, Math.random() * 150),
  });
  const [size, setSize] = useState({ w: defaultWidth, h: defaultHeight });
  const [maximized, setMaximized] = useState(false);
  const [preMaxPos, setPreMaxPos] = useState(pos);
  const [preMaxSize, setPreMaxSize] = useState(size);

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const onMouseDownTitle = useCallback(
    (e: React.MouseEvent) => {
      if (maximized) return;
      e.preventDefault();
      onFocus();
      dragging.current = true;
      dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };

      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        setPos({
          x: Math.max(0, ev.clientX - dragOffset.current.x),
          y: Math.max(0, ev.clientY - dragOffset.current.y),
        });
      };
      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [maximized, pos, onFocus]
  );

  const onMouseDownResize = useCallback(
    (e: React.MouseEvent) => {
      if (maximized) return;
      e.preventDefault();
      e.stopPropagation();
      resizing.current = true;
      resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };

      const onMove = (ev: MouseEvent) => {
        if (!resizing.current) return;
        setSize({
          w: Math.max(200, resizeStart.current.w + (ev.clientX - resizeStart.current.x)),
          h: Math.max(120, resizeStart.current.h + (ev.clientY - resizeStart.current.y)),
        });
      };
      const onUp = () => {
        resizing.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [maximized, size]
  );

  const toggleMaximize = () => {
    if (maximized) {
      setPos(preMaxPos);
      setSize(preMaxSize);
      setMaximized(false);
    } else {
      setPreMaxPos(pos);
      setPreMaxSize(size);
      setMaximized(true);
    }
  };

  const windowStyle: React.CSSProperties = maximized
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 30px)",
        zIndex,
        display: "flex",
        flexDirection: "column",
      }
    : {
        position: "fixed",
        top: pos.y,
        left: pos.x,
        width: size.w,
        height: size.h,
        zIndex,
        display: "flex",
        flexDirection: "column",
      };

  return (
    <div
      className="win-window"
      style={windowStyle}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={`win-titlebar ${focused ? "" : "win-titlebar-inactive"}`}
        onMouseDown={onMouseDownTitle}
        onDoubleClick={toggleMaximize}
        style={{ cursor: maximized ? "default" : "move", flexShrink: 0 }}
      >
        <span style={{ fontSize: "13px" }}>{icon}</span>
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </span>
        {/* Window buttons */}
        <div style={{ display: "flex", gap: "2px", marginLeft: "4px" }}>
          <button
            className="win-btn-chrome"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            title="Minimize"
            aria-label="Minimize"
          >
            _
          </button>
          <button
            className="win-btn-chrome"
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            title="Maximize"
            aria-label="Maximize"
          >
            □
          </button>
          <button
            className="win-btn-chrome"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
            aria-label="Close"
            style={{ fontWeight: "bold" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu bar */}
      {menuBar && (
        <div className="win-menubar" style={{ flexShrink: 0 }}>
          {menuBar}
        </div>
      )}

      {/* Toolbar */}
      {toolBar && (
        <div className="win-toolbar" style={{ flexShrink: 0 }}>
          {toolBar}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {children}
      </div>

      {/* Status bar */}
      {statusBar && (
        <div className="win-statusbar" style={{ flexShrink: 0 }}>
          {statusBar}
        </div>
      )}

      {/* Resize handle */}
      {resizable && !maximized && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "12px",
            height: "12px",
            cursor: "se-resize",
            background: "transparent",
          }}
          onMouseDown={onMouseDownResize}
        />
      )}
    </div>
  );
}
