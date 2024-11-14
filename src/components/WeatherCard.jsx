import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

import sun from "../assets/svgs/day.svg";
import fog from "../assets/svgs/cloudy-night-3.svg";
import cloud from "../assets/svgs/weather.svg";
import wind from "../assets/svgs/weather_sagittarius.svg"; // Assuming this is for partially cloudy or wind conditions

import rain from "../assets/svgs/rainy-7.svg";
import snow from "../assets/svgs/snowy-6.svg";
import storm from "../assets/svgs/thunder.svg";
import weather from "../assets/svgs/weather.svg"; // Default icon

const WeatherCard = ({
  temperature,
  windSpeed,
  humidity,
  place,
  heatIndex,
  conditions,
}) => {
  const [icon, setIcon] = useState(weather); // Default to weather icon
  const [isCelsius, setIsCelsius] = useState(false); // State to track Celsius or Fahrenheit

  // Convert temperature from Fahrenheit to Celsius
  const convertToCelsius = (tempInFahrenheit) => ((tempInFahrenheit - 32) * 5) / 9;
  const currentTemperature = isCelsius
    ? convertToCelsius(temperature).toFixed(1)
    : temperature;

  useEffect(() => {
    // Set image based on weather conditions using includes for partial matches
    if (conditions.toLowerCase().includes("fog")) {
      setIcon(fog);
    } else if (conditions.toLowerCase().includes("cloudy")) {
      setIcon(cloud);
    } else if (conditions.toLowerCase().includes("overcast")) {
      setIcon(rain);
    } else if (conditions.toLowerCase().includes("snow")) {
      setIcon(snow);
    } else if (conditions.toLowerCase().includes("clear")) {
      setIcon(sun);
    } else if (conditions.toLowerCase().includes("storm")) {
      setIcon(storm);
    } else if (conditions.toLowerCase().includes("wind")) {
      setIcon(wind); // For partially cloudy or wind conditions
    } else {
      setIcon(weather); // Default to the general weather icon
    }
  }, [conditions]);

  return (
    <div className="sm:w-80 max-w-xs p-6 rounded-lg backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg text-black flex flex-col items-center">
      <img src={icon} alt="Weather icon" className="w-20 h-20 object-contain mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{place}</h2>
      <p className="text-lg font-light mb-1">Conditions: {conditions}</p>
      <p className="text-4xl font-bold mb-2">{currentTemperature}°{isCelsius ? "C" : "F"}</p>
      <div className="flex justify-between w-full mt-4 text-sm font-light">
        <div>Wind: {windSpeed} km/h</div>
        <div>Humidity: {humidity}%</div>
      </div>
      <p className="text-sm mt-2">Heat Index: {heatIndex || "N/A"}°{isCelsius ? "C" : "F"}</p>
      
      {/* Toggle Button */}
      <button
        onClick={() => setIsCelsius(!isCelsius)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Switch to {isCelsius ? "°F" : "°C"}
      </button>
    </div>
  );
};

// Define PropTypes for the component
WeatherCard.propTypes = {
  temperature: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  heatIndex: PropTypes.number,
  conditions: PropTypes.string.isRequired,
};

export default WeatherCard;
