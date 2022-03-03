import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import "./i18n";
import { Preloader } from "./common/Preloader";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Preloader />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
