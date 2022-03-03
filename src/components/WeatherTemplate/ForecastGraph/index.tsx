import React from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { conversionToCelsius, conversionToFahrenheit } from "../../Temperature";
import { AppRootStateType } from "../../../state/store";
import { TemperatureUnit } from "../../../state/unitsReducer";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { ForecastData, ForecastGraphProps } from "./types";
import { DataKey } from "recharts/types/util/types";
import "./styles.scss";

const getRandomLightColor = (index: number) => {
  const colors = [
    "#bb86fc",
    "#03dac5",
    "#4c0ade",
    "#dc8e2c",
    "#3e8d05",
    "#ecdfd9",
    "#b408b4",
    "#c7304b",
  ];
  return colors[index];
};

const getRandomDarkColor = (index: number) => {
  const colors = [
    "#B22222",
    "#006400",
    "#2c17ad",
    "#FF8C00",
    "#040426",
    "#4b2612",
    "#800980",
    "#117e64",
  ];
  return colors[index];
};

const ForecastGraph: React.FC<ForecastGraphProps> = ({
  forecastGraphItems,
  removeItem,
}) => {
  const temperatureUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.temperatureUnits
  );
  const theme = useSelector<AppRootStateType, string>(
    (state) => state.theme.themes
  );
  const dataKeys = forecastGraphItems.map(
    (item) => item.placeName.split(",")[0]
  );

  const getDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString("en-GB", {
      day: "numeric",
      month: "2-digit",
    });
  };
  const getTemperature = (temperature: number) => {
    if (temperatureUnits === TemperatureUnit.Celsius) {
      temperature = conversionToCelsius(temperature);
    } else {
      temperature = conversionToFahrenheit(temperature);
    }

    return temperature;
  };

  const forecastData = forecastGraphItems[0].daily.map((day, index) => {
    const graphData = forecastGraphItems.reduce(
      (object: ForecastData, forecastItem) => {
        const key = forecastItem.placeName.split(",")[0];
        const value = forecastItem.daily[index].temp.day;

        object[key] = getTemperature(value);

        return object;
      },
      {}
    );

    return {
      weakDay: getDate(day.dt),
      ...graphData,
    };
  });

  const removeItemHandler = (
    data: Payload & { dataKey?: DataKey<string | number> | undefined }
  ) => {
    const { dataKey } = data;
    removeItem(String(dataKey));
  };

  return (
    <div className="graph-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={forecastData}
          margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weakDay" />
          <YAxis />
          <Tooltip />
          <Legend onClick={removeItemHandler} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {dataKeys.map((dataKey, index) => (
            <Line
              key={dataKey + index}
              type="monotone"
              dataKey={dataKey}
              stroke={
                theme === "light"
                  ? getRandomDarkColor(index)
                  : getRandomLightColor(index)
              }
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastGraph;
