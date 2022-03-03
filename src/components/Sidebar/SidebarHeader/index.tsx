import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { SidebarHeaderProps } from "./types";
import "./styles.scss";

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  setActive,
}) => {
  return (
    <div className="sidebar-header">
      {children}
      <div className="exit-icon">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => setActive(false)}
          size="lg"
        />
      </div>
    </div>
  );
};
