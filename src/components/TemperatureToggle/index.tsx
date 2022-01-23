import React, { useState } from "react";
import "./styles.scss";
import { Toggle } from "../../common/Toggle";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { changeTemperatureUnits } from "../../state/unitsReducer";

const TemperatureToggle = () => {
  const dispatch = useDispatch();
  const temperatureUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.temperatureUnits
  );

  const [inCelsius, setInCelsius] = useState(false);

  const changeTempUnits = () => {
    setInCelsius(!inCelsius);
    inCelsius
      ? dispatch(changeTemperatureUnits("°C"))
      : dispatch(changeTemperatureUnits("°F"));
  };

  return (
    <div className="temp-toggle-container">
      <Toggle title={temperatureUnits} callback={changeTempUnits} />
    </div>
  );
};

export default TemperatureToggle;
