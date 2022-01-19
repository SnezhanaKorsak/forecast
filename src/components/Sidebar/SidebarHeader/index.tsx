import React from "react";
import { SidebarHeaderProps } from "./types";
import "./styles.scss";
import { Button } from "../../../common/Button";

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  setActive,
}) => {
  return (
    <div className="sidebar-header">
      {children}
      <div className={"exit-btn"}>
        <Button callback={() => setActive(false)}>
          <span>×</span>
        </Button>
      </div>
    </div>
  );
};
