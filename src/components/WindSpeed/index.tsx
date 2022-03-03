import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppRootStateType } from "../../state/store";
import { setWindSpeed, WindUnit } from "../../state/unitsReducer";
import { WindSpeedProps } from "./types";

export const conversionToKilometers = (speed: number) => {
  return Math.round((speed * 3600) / 1000);
};

export const WindSpeed: React.FC<WindSpeedProps> = ({ windSpeed }) => {
  const dispatch = useDispatch();

  const windUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.windUnits
  );
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setWindSpeed());
  }, []);

  windSpeed =
    windUnits === WindUnit.Meters
      ? windSpeed
      : conversionToKilometers(windSpeed);

  const windUnitsTranslate =
    windUnits === WindUnit.Meters ? t("units.hPa") : t("units.kmh");

  const conditionValue = `${windSpeed} ${windUnitsTranslate}`;

  return <span>{conditionValue}</span>;
};
