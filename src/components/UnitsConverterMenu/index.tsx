import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TemperatureToggle from "../TemperatureToggle";
import { WindSpeedToggle } from "../WindSpeed/WindSpeedToggle";
import { PressureToggle } from "../Pressure/PressureToggle";
import { CollapsedToggle } from "../../common/CollapsedToggle";
import "./styles.scss";

export const UnitsConverterMenu = () => {
  const [convertersCollapsed, setConvertersCollapsed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const isCollapsedLS = localStorage.getItem("convertersCollapsed");
    if (isCollapsedLS) {
      setConvertersCollapsed(JSON.parse(isCollapsedLS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "convertersCollapsed",
      JSON.stringify(convertersCollapsed)
    );
  }, [convertersCollapsed]);

  const collapsedHandler = () => {
    setConvertersCollapsed(!convertersCollapsed);
  };

  return (
    <div className="units-converter-block">
      <div className="units-converter-block-label">
        <span>{t("units.measurement")}</span>
        <CollapsedToggle callback={collapsedHandler} />
      </div>
      <hr />
      {!convertersCollapsed && (
        <div className="converter-items">
          <div className="units-converter">
            <span>{t("conditions.temperature")}</span>
            <TemperatureToggle />
          </div>

          <div className="units-converter">
            <span>{t("conditions.windSpeed")}</span>
            <WindSpeedToggle />
          </div>

          <div className="units-converter">
            <span>{t("conditions.pressure")}</span>
            <PressureToggle />
          </div>
        </div>
      )}
    </div>
  );
};
