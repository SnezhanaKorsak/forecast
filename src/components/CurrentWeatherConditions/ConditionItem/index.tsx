import React from "react";
import "./styles.scss";
import { ConditionItemProps } from "./types";

export const ConditionItem: React.FC<ConditionItemProps> = ({
  conditionName,
  value,
  units,
}) => {
  const conditionValue = `${value} ${units}`;

  return (
    <div className="condition">
      <p>{conditionName}</p>
      <p>{conditionValue}</p>
    </div>
  );
};
