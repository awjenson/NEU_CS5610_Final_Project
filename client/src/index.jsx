import React from "react";
import ReactDOM from "react-dom/client";
import App from './components/App';

import "./style/normalize.css";
import "./style/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode is a tool for highlighting potential problems in an application
  // https://react.dev/reference/react/StrictMode
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
