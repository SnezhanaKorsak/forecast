import React from "react";
import { CustomSelectProps } from "./types";

export const CustomSelect: React.FC<CustomSelectProps> = ({ options }) => {
  const mappedOptions = options.map((options) => (
    <option key={options.id}>{options.place_name}</option>
  ));

  return <datalist id="select">{mappedOptions}</datalist>;
};
