import React from "react";
import "./styles.scss";
import { ToggleProps } from "./types";

export const Toggle: React.FC<ToggleProps> = ({ title, callback, checked }) => {
  return (
    <div className="toggle-container">
      <label className="switch">
        <input
          type={"checkbox"}
          onClick={callback}
          checked={checked}
          hidden
          readOnly
        />
        <div className="track">
          <div className="thumb">{title}</div>
        </div>
      </label>
    </div>
  );
};
