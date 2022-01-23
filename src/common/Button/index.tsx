import React from "react";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
  className,
  callback,
  children,
}) => {
  return (
    <button className={className} onClick={() => callback(false)}>
      {children}
    </button>
  );
};
