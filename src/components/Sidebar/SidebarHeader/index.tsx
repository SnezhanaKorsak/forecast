import React from "react";
import { SidebarHeaderProps } from "./types";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  setActive,
}) => {
  return (
    <div className="sidebar-header">
      {children}
      <div className={"exit-icon"}>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => setActive(false)}
          size={"lg"}
        />
      </div>
    </div>
  );
};
