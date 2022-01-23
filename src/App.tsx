import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherTemplate from "./components/WeatherTemplate";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="section-container">
        <WeatherTemplate />
        <Footer />
      </div>
    </div>
  );
}

export default App;
