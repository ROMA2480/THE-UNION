"use client";

import DraggableWindow from "./DraggableWindow";

interface Props {
  focused: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

export default function WindowAbout({ focused, zIndex, onClose, onMinimize, onFocus }: Props) {
  return (
    <DraggableWindow
      title="About Windows 2000"
      icon="ℹ️"
      focused={focused}
      zIndex={zIndex}
      defaultWidth={360}
      defaultHeight={320}
      defaultX={300}
      defaultY={120}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      resizable={false}
    >
      <div
        style={{
          background: "#d4d0c8",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header banner */}
        <div
          style={{
            background: "linear-gradient(to right, #000080, #1084d0)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "36px" }}>⊞</span>
          <div>
            <div style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
              Microsoft Windows 2000
            </div>
            <div style={{ color: "#b0c8e8", fontSize: "12px" }}>
              Professional
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
          <div
            className="win-inset"
            style={{ padding: "8px", marginBottom: "12px", background: "#ffffff" }}
          >
            <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
              <strong>Microsoft Windows 2000</strong><br />
              Version 5.00.2195<br />
              Service Pack 4<br />
              <br />
              Copyright © 1985-2000 Microsoft Corporation<br />
              All rights reserved.<br />
              <br />
              This product is licensed to:<br />
              <strong>John Doe</strong><br />
              WORKGROUP\JohnDoe
            </div>
          </div>

          <div style={{ fontSize: "11px", marginBottom: "12px", lineHeight: "1.5" }}>
            <strong>Physical Memory Available:</strong> 261,616 KB<br />
            <strong>Processor:</strong> x86 Family 6 Model 8 Stepping 1<br />
            <strong>Architecture:</strong> x86
          </div>

          {/* Memory bar */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "11px", marginBottom: "4px" }}>Memory Usage:</div>
            <div className="win-progress-track" style={{ height: "16px" }}>
              <div
                className="win-progress-fill"
                style={{ width: "43%", height: "100%" }}
              />
            </div>
            <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
              43% (112 MB of 256 MB used)
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            <button className="win-btn" style={{ minWidth: "80px" }} onClick={onClose}>
              OK
            </button>
            <button className="win-btn" style={{ minWidth: "80px" }}>
              Technical Support
            </button>
          </div>
        </div>
      </div>
    </DraggableWindow>
  );
}
