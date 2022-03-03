import React, { useEffect } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherTemplate from "./components/WeatherTemplate";
import { ErrorSnackBar } from "./components/ErrorSnackBar";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { setThemeToState } from "./state/themeReducer";

function App() {
  const dispatch = useDispatch();
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.rootError
  );
  const theme = useSelector<AppRootStateType, string>(
    (state) => state.theme.themes
  );

  useEffect(() => {
    dispatch(setThemeToState());
  }, []);

  return (
    <div className={`wrapper ${theme}`}>
      <Header />
      {error && <ErrorSnackBar />}
      <div className="section-container">
        <WeatherTemplate />
      </div>
      <Footer />
    </div>
  );
}

export default App;
