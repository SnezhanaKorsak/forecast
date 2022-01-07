import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherTemplate from "./components/WeatherTemplate";

function App() {
  return (
    <div className="page-content">
      <Header />
      <WeatherTemplate />
      <Footer />
    </div>
  );
}

export default App;
