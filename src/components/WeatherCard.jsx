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
  
  // Convert Fahrenheit to Celsius
  const celsiusTemperature = ((temperature - 32) * 5) / 9;
  const celsiusHeatIndex = heatIndex ? ((heatIndex - 32) * 5) / 9 : null;

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
      <p className="text-4xl font-bold mb-2">{celsiusTemperature.toFixed(1)}°C</p>
      <div className="flex justify-between w-full mt-4 text-sm font-light">
        <div>Wind: {windSpeed} km/h</div>
        <div>Humidity: {humidity}%</div>
      </div>
      <p className="text-sm mt-2">Heat Index: {celsiusHeatIndex ? `${celsiusHeatIndex.toFixed(1)}°C` : "N/A"}</p>
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
