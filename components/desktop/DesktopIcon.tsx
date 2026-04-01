"use client";

import { useState } from "react";

interface Props {
  icon: string;
  label: string;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ icon, label, onDoubleClick }: Props) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className="win-icon select-none"
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
        setSelected(false);
      }}
      onBlur={() => setSelected(false)}
    >
      <div
        style={{
          fontSize: "32px",
          filter: selected ? "brightness(0.7) sepia(1) hue-rotate(190deg) saturate(5)" : "none",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <span
        className={`win-icon-label ${selected ? "bg-[#316ac5] text-white" : ""}`}
        style={{ maxWidth: "68px", textAlign: "center" }}
      >
        {label}
      </span>
    </div>
  );
}
