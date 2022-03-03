import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppRootStateType } from "../../state/store";
import { PressureUnit, setPressure } from "../../state/unitsReducer";
import { PressureProps } from "./types";

export const conversionToMillimeters = (pressure: number) => {
  return Math.round(pressure * 0.750064);
};

export const Pressure: React.FC<PressureProps> = ({ pressure }) => {
  const dispatch = useDispatch();

  const pressuredUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.pressureUnit
  );
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setPressure());
  }, []);

  pressure =
    pressuredUnits === PressureUnit.Pascal
      ? pressure
      : conversionToMillimeters(pressure);

  const pressuredUnitsTranslate =
    pressuredUnits === PressureUnit.Pascal ? t("units.hPa") : t("units.mmHg");

  const conditionValue = `${pressure} ${pressuredUnitsTranslate}`;

  return <span>{conditionValue}</span>;
};
