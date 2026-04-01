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

export default function WindowIE({ focused, zIndex, onClose, onMinimize, onFocus }: Props) {
  const [url, setUrl] = useState("http://www.microsoft.com/windows2000/");
  const [inputUrl, setInputUrl] = useState(url);
  const [loading, setLoading] = useState(false);

  const navigate = () => {
    setLoading(true);
    setUrl(inputUrl);
    setTimeout(() => setLoading(false), 800);
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
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>🔄 Stop</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>🔃 Refresh</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>🏠 Home</button>
      <div className="win-sep" />
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>🔍 Search</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>⭐ Favorites</button>
      <button className="win-btn" style={{ padding: "1px 6px", fontSize: "11px" }}>📜 History</button>
      <div className="win-sep" style={{ flex: "0 0 auto" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
        <span style={{ fontSize: "11px", whiteSpace: "nowrap" }}>Address</span>
        <input
          className="win-address"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate()}
          style={{ flex: 1 }}
        />
        <button className="win-btn" style={{ padding: "1px 8px", fontSize: "11px" }} onClick={navigate}>
          Go
        </button>
      </div>
    </>
  );

  const statusBar = (
    <>
      <span className="win-statusbar-panel" style={{ flex: 1 }}>
        {loading ? "Loading..." : "Done"}
      </span>
      <span className="win-statusbar-panel">🔒 Internet</span>
      <span className="win-statusbar-panel">🌐 Internet zone</span>
    </>
  );

  return (
    <DraggableWindow
      title="Microsoft Internet Explorer"
      icon="🌐"
      focused={focused}
      zIndex={zIndex}
      defaultWidth={620}
      defaultHeight={460}
      defaultX={120}
      defaultY={40}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      menuBar={menuBar}
      toolBar={toolBar}
      statusBar={statusBar}
    >
      <div
        className="win-inset"
        style={{ height: "100%", overflowY: "auto", background: "#ffffff", padding: "16px", fontFamily: "Times New Roman, serif", fontSize: "13px" }}
      >
        {/* Fake IE content */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "40px" }}>🌐</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#000080" }}>Microsoft</div>
              <div style={{ fontSize: "13px", color: "#000080" }}>Windows 2000 Professional</div>
            </div>
          </div>
          <hr style={{ borderTop: "2px solid #000080", marginBottom: "12px" }} />
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
          <tbody>
            <tr style={{ verticalAlign: "top" }}>
              <td style={{ width: "200px", paddingRight: "16px", borderRight: "1px solid #cccccc" }}>
                <div style={{ fontWeight: "bold", color: "#000080", fontSize: "12px", marginBottom: "8px" }}>NAVIGATION</div>
                {[
                  "🏠 Home",
                  "📁 My Documents",
                  "🖥️ My Computer",
                  "🌐 Network Places",
                  "🔌 Connect To",
                  "🖨️ Printers",
                  "⚙️ Control Panel",
                  "❓ Help and Support",
                  "🔍 Search",
                  "▶️ Run...",
                ].map((item) => (
                  <div
                    key={item}
                    style={{ padding: "2px 0", cursor: "pointer", fontSize: "12px" }}
                    className="hover:underline"
                  >
                    <a href="#" style={{ color: "#0000ee", textDecoration: "none" }}
                       className="hover:underline">{item}</a>
                  </div>
                ))}
              </td>
              <td style={{ paddingLeft: "16px" }}>
                <h2 style={{ fontSize: "16px", color: "#000080", marginTop: 0, marginBottom: "8px" }}>
                  Welcome to Windows 2000
                </h2>
                <p style={{ margin: "0 0 8px", lineHeight: "1.5" }}>
                  Windows 2000 Professional is the most reliable Windows yet for business desktops and laptops.
                  It supports the latest hardware, provides enhanced security features, and includes built-in
                  support for networking and the Internet.
                </p>
                <p style={{ margin: "0 0 12px", lineHeight: "1.5" }}>
                  <strong>What&apos;s New:</strong>
                </p>
                <ul style={{ margin: "0 0 12px", paddingLeft: "18px", lineHeight: "1.6" }}>
                  <li>Plug and Play hardware support</li>
                  <li>Built-in Internet Connection Sharing</li>
                  <li>Enhanced security with Kerberos authentication</li>
                  <li>Encrypted File System (EFS)</li>
                  <li>Support for USB, IEEE 1394, and DVD</li>
                </ul>
                <div style={{ background: "#f0f0f0", border: "1px solid #cccccc", padding: "8px", marginBottom: "12px" }}>
                  <strong style={{ color: "#000080" }}>System Tip of the Day</strong>
                  <p style={{ margin: "4px 0 0", fontSize: "11px" }}>
                    Press Ctrl+Alt+Delete to open the Windows Security dialog at any time.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["Windows Update", "Product Activation", "Technical Support", "Online Help"].map((btn) => (
                    <button key={btn} className="win-btn" style={{ fontSize: "11px" }}>
                      {btn}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ borderTop: "1px solid #cccccc" }} />
        <div style={{ fontSize: "10px", color: "#666666", marginTop: "8px", textAlign: "center" }}>
          © 2000 Microsoft Corporation. All rights reserved. |{" "}
          <a href="#" style={{ color: "#0000ee" }}>Terms of Use</a> |{" "}
          <a href="#" style={{ color: "#0000ee" }}>Privacy Statement</a>
        </div>
      </div>
    </DraggableWindow>
  );
}
