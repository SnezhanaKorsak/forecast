import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../../../common/Toggle";
import { AppRootStateType } from "../../../state/store";
import {
  changePressuredUnits,
  PressureUnit,
} from "../../../state/unitsReducer";

export const PressureToggle = () => {
  const dispatch = useDispatch();
  const pressuredUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.pressureUnit
  );
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem("pressureUnits", JSON.stringify(pressuredUnits));
  }, [pressuredUnits]);

  const changeUnits = () => {
    pressuredUnits === PressureUnit.Millimeters
      ? dispatch(changePressuredUnits(PressureUnit.Pascal))
      : dispatch(changePressuredUnits(PressureUnit.Millimeters));
  };

  const pressuredUnitsTranslate =
    pressuredUnits === PressureUnit.Pascal ? t("units.hPa") : t("units.mmHg");
  const checked = pressuredUnits === PressureUnit.Millimeters;

  return (
    <Toggle
      title={pressuredUnitsTranslate}
      callback={changeUnits}
      checked={checked}
    />
  );
};
