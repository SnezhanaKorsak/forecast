import React, { useEffect, useState, MouseEvent } from "react";
import { SidebarProps } from "./types";
import "./styles.scss";

const Sidebar: React.FC<SidebarProps> = ({ setActive, active, children }) => {
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    if (active) {
      setShown(true);
    }
  }, [active]);

  function onAnimationEnd(): void {
    if (!active) {
      setShown(false);
    }
  }

  function onBackdropClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) {
      setActive(false);
    }
  }

  return shown ? (
    <div
      className={`sidebar-overlay ${active ? "" : "mod-hiding"}`}
      onAnimationEnd={onAnimationEnd}
      onClick={onBackdropClick}
    >
      <div className="menu-container">
        <div className="menu-content">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Sidebar;
