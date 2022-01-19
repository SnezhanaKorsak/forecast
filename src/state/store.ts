import { applyMiddleware, combineReducers, createStore } from "redux";
import { currentWeatherReducer } from "./currentWeatherReducer";
import thunk from "redux-thunk";
import { locationReducer } from "./locationReducer";
import { unitsReducer } from "./unitsReducer";

const rootReducer = combineReducers({
  currentWeather: currentWeatherReducer,
  location: locationReducer,
  units: unitsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
