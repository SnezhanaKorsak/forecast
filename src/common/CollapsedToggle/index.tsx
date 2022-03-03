import React from "react";
import { CollapsedToggleProps } from "./types";
import "./styles.scss";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CollapsedToggle: React.FC<CollapsedToggleProps> = ({
  callback,
}) => {
  return (
    <div className="collapsed-toggle-container">
      <FontAwesomeIcon
        className="collapsed-toggle"
        icon={faCaretDown}
        onClick={callback}
        size="10x"
      />
    </div>
  );
};
