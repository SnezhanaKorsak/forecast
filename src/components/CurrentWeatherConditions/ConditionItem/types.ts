export interface ConditionItemProps {
  conditionName: string;
  value: number | null;
  units: string;
}

export interface ConditionsType {
  id: number;
  name: string;
  value: number | null;
  units: string;
  description?: string;
}
