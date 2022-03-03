import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../../common/Toggle";
import { AppRootStateType } from "../../state/store";
import {
  changeTemperatureUnits,
  TemperatureUnit,
} from "../../state/unitsReducer";
import "./styles.scss";

const TemperatureToggle = () => {
  const dispatch = useDispatch();
  const temperatureUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.temperatureUnits
  );

  useEffect(() => {
    localStorage.setItem("temperatureUnits", JSON.stringify(temperatureUnits));
  }, [temperatureUnits]);

  const changeTempUnits = () => {
    temperatureUnits === TemperatureUnit.Fahrenheit
      ? dispatch(changeTemperatureUnits(TemperatureUnit.Celsius))
      : dispatch(changeTemperatureUnits(TemperatureUnit.Fahrenheit));
  };

  const checked = temperatureUnits === TemperatureUnit.Fahrenheit;

  return (
    <div className="temp-toggle-container">
      <Toggle
        title={temperatureUnits}
        callback={changeTempUnits}
        checked={checked}
      />
    </div>
  );
};

export default TemperatureToggle;
