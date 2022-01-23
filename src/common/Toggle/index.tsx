import React from "react";
import "./styles.scss";
import { ToggleProps } from "./types";

export const Toggle: React.FC<ToggleProps> = ({ title, callback }) => {
  return (
    <label className="switch">
      <input type={"checkbox"} onClick={callback} hidden />
      <div className="track">
        <div className="thumb">{title}</div>
      </div>
    </label>
  );
};
