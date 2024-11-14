import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import sun from "../assets/svgs/day.svg";
import fog from "../assets/svgs/cloudy-night-3.svg";
import cloud from "../assets/svgs/weather.svg";
import wind from "../assets/svgs/weather_sagittarius.svg";
import rain from "../assets/svgs/rainy-7.svg";
import snow from "../assets/svgs/snowy-6.svg";
import storm from "../assets/svgs/thunder.svg";
import weather from "../assets/svgs/weather.svg";

const WeatherCard = ({
  temperature,
  windSpeed,
  humidity,
  place,
  heatIndex,
  conditions,
}) => {
  const [icon, setIcon] = useState(weather);
  const [isCelsius, setIsCelsius] = useState(true);

  // Function to convert Fahrenheit to Celsius
  const convertToCelsius = (temp) => ((temp - 32) * 5) / 9;
  // Toggle temperature unit
  const toggleTemperatureUnit = () => setIsCelsius(!isCelsius);

  // Calculate temperature based on the selected unit
  const displayTemperature = isCelsius
    ? convertToCelsius(temperature).toFixed(1)
    : temperature.toFixed(1);
  const displayHeatIndex = heatIndex
    ? (isCelsius ? convertToCelsius(heatIndex).toFixed(1) : heatIndex.toFixed(1))
    : "N/A";

  useEffect(() => {
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
      setIcon(wind);
    } else {
      setIcon(weather);
    }
  }, [conditions]);

  return (
    <div className="sm:w-80 max-w-xs p-6 rounded-lg backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg text-black flex flex-col items-center">
      <img src={icon} alt="Weather icon" className="w-20 h-20 object-contain mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{place}</h2>
      <p className="text-lg font-light mb-1">Conditions: {conditions}</p>
      <p className="text-4xl font-bold mb-2">
        {displayTemperature}°{isCelsius ? "C" : "F"}
      </p>
      <button
        onClick={toggleTemperatureUnit}
        className="mt-2 text-sm text-blue-500 underline"
      >
        Switch to °{isCelsius ? "F" : "C"}
      </button>
      <div className="flex justify-between w-full mt-4 text-sm font-light">
        <div>Wind: {windSpeed} km/h</div>
        <div>Humidity: {humidity}%</div>
      </div>
      <p className="text-sm mt-2">
        Heat Index: {displayHeatIndex}°{isCelsius ? "C" : "F"}
      </p>
    </div>
  );
};

WeatherCard.propTypes = {
  temperature: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  heatIndex: PropTypes.number,
  conditions: PropTypes.string.isRequired,
};

export default WeatherCard;
