import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StateContextProvider } from "./contexts/WeatherContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <StateContextProvider>
      <App />
      </StateContextProvider>
  </StrictMode>
);
