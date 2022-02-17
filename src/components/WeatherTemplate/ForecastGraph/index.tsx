import React from "react";
import "./styles.scss";
import { ForecastData, ForecastGraphProps } from "./types";
import { conversionToCelsius, conversionToFahrenheit } from "../../Temperature";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";
import { TemperatureUnit } from "../../../state/unitsReducer";
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
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { DataKey } from "recharts/types/util/types";

/*const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}*/

const getRandomColor = () => {
  const colors = [
    "#B22222",
    "#006400",
    "#483D8B",
    "#FF8C00",
    "#8B4513",
    "#000000",
    "#800080",
  ];
  return colors[Math.floor(Math.random() * 7)];
};

const ForecastGraph: React.FC<ForecastGraphProps> = ({
  forecastGraphItems,
  removeItem,
}) => {
  const temperatureUnits = useSelector<AppRootStateType, string>(
    (state) => state.units.temperatureUnits
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
    data: Payload & { dataKey?: DataKey<any> | undefined }
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
          <Legend onClick={removeItemHandler} data-title="Delete this item" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {dataKeys.map((dataKey) => (
            <Line
              key={dataKey + 1}
              type="monotone"
              dataKey={dataKey}
              stroke={getRandomColor()}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastGraph;
