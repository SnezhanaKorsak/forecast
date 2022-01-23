import React from "react";
import "./styles.scss";
import { CustomSelectProps } from "./types";

export const CustomSelect: React.FC<CustomSelectProps> = ({ options }) => {
  const mappedOptions = options.map((options) => (
    <option key={options.id}>{options.place_name}</option>
  ));

  // const onChangeOption = (e: React.FormEvent<HTMLDataListElement>) => {
  //    alert(e.currentTarget.options)
  // }

  return (
    <datalist id="select" /*onChange={onChangeOption}*/>
      {mappedOptions}
    </datalist>
  );
};
