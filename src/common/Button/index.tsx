import React from "react";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({ callback, children }) => {
  return <button onClick={() => callback(false)}>{children}</button>;
};
