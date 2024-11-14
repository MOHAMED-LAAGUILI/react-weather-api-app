import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sun from "../assets/svgs/day.svg";
import fog from "../assets/svgs/cloudy-night-3.svg";
import cloud from "../assets/svgs/weather.svg";
import wind from "../assets/svgs/weather_sagittarius.svg";
import rain from "../assets/svgs/rainy-7.svg";
import snow from "../assets/svgs/snowy-6.svg";
import storm from "../assets/svgs/thunder.svg";
import weatherico from "../assets/svgs/weather.svg";
import { useStateContext } from "../contexts/WeatherContext";

const MiniCard = ({ day, iconString, temp }) => {
  const displayDay = day || 'N/A';
  const displayTemp = temp !== null && temp !== undefined ? `${temp}°C` : 'N/A';
  const { weather } = useStateContext();

  const [icon, setIcon] = useState(weatherico);

  useEffect(() => {
    if (iconString) {
      const condition = iconString.toLowerCase();
      if (condition.includes("fog")) {
        setIcon(fog);
      } else if (condition.includes("cloud")) {
        setIcon(cloud);
      } else if (condition.includes("overcast")) {
        setIcon(rain);
      } else if (condition.includes("snow")) {
        setIcon(snow);
      } else if (condition.includes("sun")) {
        setIcon(sun);
      } else if (condition.includes("storm")) {
        setIcon(storm);
      } else if (condition.includes("wind")) {
        setIcon(wind);
      } else {
        setIcon(weatherico);
      }
    } else {
      setIcon(weatherico);
    }
  }, [iconString, weather]);

  return (
    <div className="relative overflow-hidden p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 flex flex-col items-center justify-between h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12" aria-hidden="true"></div>
      <div className="relative z-10 flex flex-col items-center w-full">
        <h3 className="text-lg font-semibold mb-2">{displayDay}</h3>
        <div className="relative w-16 h-16 mb-3">
          <img 
            src={icon} 
            alt={`Weather icon for ${iconString || 'unknown weather'}`} 
            className="w-full h-full object-contain" 
            aria-hidden="true"
          />
        </div>
        <p className="text-3xl font-bold mb-1" aria-label={`Temperature: ${displayTemp}`}>{displayTemp}</p>
        <p className="text-sm opacity-75 text-center">{iconString || 'Unknown conditions'}</p>
      </div>
    </div>
  );
};

MiniCard.propTypes = {
  day: PropTypes.string.isRequired,
  iconString: PropTypes.string,
  temp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MiniCard;