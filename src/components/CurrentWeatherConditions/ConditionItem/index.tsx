import React from "react";
import { ConditionItemProps } from "./types";
import "./styles.scss";

export const ConditionItem: React.FC<ConditionItemProps> = ({
  conditionName,
  value,
  units,
}) => {
  const conditionValue = `${value} ${units}`;

  return (
    <div className="condition">
      <p className="condition-title">{conditionName}</p>
      <p>{conditionValue}</p>
    </div>
  );
};
