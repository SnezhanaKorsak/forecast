import { applyMiddleware, combineReducers, createStore } from "redux";
import { currentWeatherReducer } from "./currentWeatherReducer";
import thunk from "redux-thunk";
import { locationReducer } from "./locationReducer";
import { unitsReducer } from "./unitsReducer";
import { forecastReducer } from "./forecastReducer";

const rootReducer = combineReducers({
  currentWeather: currentWeatherReducer,
  forecast: forecastReducer,
  location: locationReducer,
  units: unitsReducer,
  //settings: settingsReducer,
});

/*
let preloadedState;
const persistedTString = localStorage.getItem("favourites")

if (persistedTString) {
    preloadedState = JSON.parse(persistedTString)
}
*/

export const store = createStore(rootReducer, applyMiddleware(thunk));

/*
store.subscribe(() => {
    localStorage.setItem("favourites", JSON.stringify(store.getState().forecast.favourites))
})
*/

export type AppRootStateType = ReturnType<typeof rootReducer>;
