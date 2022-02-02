import React, { useState } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import {
  changeOrderForecastPanel,
  ForecastPanelType,
} from "../../state/forecastReducer";
import { ForecastPanel } from "./ForecastPanel";

const WeatherTemplate = () => {
  const dispatch = useDispatch();

  const forecastPanels = useSelector<AppRootStateType, ForecastPanelType[]>(
    (state) => state.forecast
  );

  const [currentPanel, setCurrentPanel] = useState<null | ForecastPanelType>(
    null
  );

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    panel: ForecastPanelType
  ) => {
    setCurrentPanel(panel);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    panel: ForecastPanelType
  ) => {
    e.preventDefault();
    forecastPanels.map((pl) => {
      if (currentPanel) {
        if (pl.id === panel.id) {
          dispatch(changeOrderForecastPanel(pl.id, currentPanel.order));
        }
        if (pl.id === currentPanel.id) {
          dispatch(changeOrderForecastPanel(pl.id, panel.order));
        }
        return pl;
      }
    });
  };

  const sortPanels = (a: ForecastPanelType, b: ForecastPanelType) =>
    a.order > b.order ? 1 : -1;

  const panels = forecastPanels.sort(sortPanels).map((panel) => (
    <div
      key={panel.id}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, panel)}
      onDragOver={dragOverHandler}
      onDrop={(e) => dropHandler(e, panel)}
    >
      <ForecastPanel panelId={panel.id} />
    </div>
  ));

  return <>{panels}</>;
};

export default WeatherTemplate;
