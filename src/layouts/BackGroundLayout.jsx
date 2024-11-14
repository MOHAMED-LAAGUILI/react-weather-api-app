import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/WeatherContext";

import clear from "../assets/images/clear.jpg";
import fog from "../assets/images/foggy.jpg";
import cloud from "../assets/images/cloudy.jpg";
import rain from "../assets/images/rain.png";
import snow from "../assets/images/snow.jpg";
import sun from "../assets/images/sunny.jpg";
import storm from "../assets/images/rainy.jpg";
import PropTypes from "prop-types";

const BackGroundLayout = ({ children }) => {
    const { weather } = useStateContext();
    const [image, setImage] = useState(clear); // Default image

    useEffect(() => {
        if (weather?.conditions) {
            const condition = weather.conditions.toLowerCase();

            // Set image based on weather conditions
            switch (true) {
                case condition.includes("fog"):
                    setImage(fog);
                    break;
                case condition.includes("cloud"):
                    setImage(cloud);
                    break;
                case condition.includes("rain"):
                    setImage(rain);
                    break;
                case condition.includes("snow"):
                    setImage(snow);
                    break;
                case condition.includes("sun"):
                    setImage(sun);
                    break;
                case condition.includes("storm"):
                    setImage(storm);
                    break;
                default:
                    setImage(clear); // Default to clear if no match
                    break;
            }
        }
    }, [weather]);

    return (
        <div style={{ position: "relative", height: "100vh" }}>
            {/* Background image layer */}
            <div
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1, // Set the background behind the content
                    opacity: 0.8 // Adjust opacity for better readability of content
                }}
            />

            {/* Content layer */}
            <div style={{ position: "relative", zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
};

BackGroundLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export default BackGroundLayout;
