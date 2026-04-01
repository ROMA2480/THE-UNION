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

const defaultText = `Welcome to Notepad

This is a retro Windows 2000 style interface.

You can type anything here...

Tips:
- Double-click desktop icons to open windows
- Drag windows by their title bars
- Click the taskbar buttons to switch between windows
- Use the Start menu to open programs

Have a great day! 😊`;

export default function WindowNotepad({ focused, zIndex, onClose, onMinimize, onFocus }: Props) {
  const [text, setText] = useState(defaultText);
  const [wordWrap, setWordWrap] = useState(true);
  const lineCount = text.split("\n").length;
  const charCount = text.length;

  const menuBar = (
    <>
      {["File", "Edit", "Format", "View", "Help"].map((m) => (
        <span key={m} className="win-menu-item">{m}</span>
      ))}
    </>
  );

  const statusBar = (
    <>
      <span className="win-statusbar-panel" style={{ flex: 1 }}>
        Ln {lineCount} | {charCount} chars
      </span>
      <span className="win-statusbar-panel">
        {wordWrap ? "Word Wrap: On" : "Word Wrap: Off"}
      </span>
    </>
  );

  return (
    <DraggableWindow
      title={`${text.trim() ? "Untitled" : "Untitled"} - Notepad`}
      icon="📄"
      focused={focused}
      zIndex={zIndex}
      defaultWidth={440}
      defaultHeight={340}
      defaultX={200}
      defaultY={100}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      menuBar={menuBar}
      statusBar={statusBar}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "100%",
          resize: "none",
          border: "none",
          outline: "none",
          padding: "4px",
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: "12px",
          lineHeight: "1.4",
          background: "#ffffff",
          color: "#000000",
          whiteSpace: wordWrap ? "pre-wrap" : "pre",
          wordBreak: wordWrap ? "break-word" : "normal",
          overflowX: wordWrap ? "hidden" : "auto",
          overflowY: "auto",
        }}
        spellCheck={false}
      />
    </DraggableWindow>
  );
}
