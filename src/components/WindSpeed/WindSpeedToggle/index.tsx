import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Toggle } from "../../../common/Toggle";
import { AppRootStateType } from "../../../state/store";
import { changeWindSpeedUnits, WindUnit } from "../../../state/unitsReducer";

export const WindSpeedToggle = () => {
  const dispatch = useDispatch();
  const windSpeedUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.windUnits
  );
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem("windUnits", JSON.stringify(windSpeedUnits));
  }, [windSpeedUnits]);

  const changeUnits = () => {
    windSpeedUnits === WindUnit.Kilometers
      ? dispatch(changeWindSpeedUnits(WindUnit.Meters))
      : dispatch(changeWindSpeedUnits(WindUnit.Kilometers));
  };

  const windUnitsTranslate =
    windSpeedUnits === WindUnit.Meters ? t("units.ms") : t("units.kmh");
  const checked = windSpeedUnits === WindUnit.Kilometers;

  return (
    <Toggle
      title={windUnitsTranslate}
      callback={changeUnits}
      checked={checked}
    />
  );
};
