import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherTemplate from "./components/WeatherTemplate";
import { ErrorSnackBar } from "./components/ErrorSnackBar";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

function App() {
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );

  return (
    <div className="wrapper">
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
