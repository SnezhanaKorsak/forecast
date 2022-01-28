import { applyMiddleware, combineReducers, createStore } from "redux";
import { currentWeatherReducer } from "./currentWeatherReducer";
import thunk from "redux-thunk";
import { locationReducer } from "./locationReducer";
import { unitsReducer } from "./unitsReducer";
import { settingsReducer } from "./settingsReducer";
import { forecastReducer } from "./forecastReducer";

const rootReducer = combineReducers({
  currentWeather: currentWeatherReducer,
  forecast: forecastReducer,
  location: locationReducer,
  units: unitsReducer,
  //settings: settingsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
