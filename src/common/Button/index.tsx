import React from "react";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
  callback,
  children,
  disabled,
}) => {
  return (
    <button onClick={() => callback(false)} disabled={disabled}>
      {children}
    </button>
  );
};
