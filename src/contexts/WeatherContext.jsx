import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// Create context
const StateContext = createContext();

// Create the context provider component
export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [values, setValues] = useState(null);
  const [place, setPlace] = useState("ksar el kebir");
  const [location, setLocation] = useState("");

  // Fetch weather data
  const fetchWeather = async () => {
    // lol  i had this huge problem cannot import api key from env i tried many solutions so i decided to past it here i know its not safe 
    // but for now this is a mini weather app so why the fuck not
    //const apiKey = import.meta.env.VITE_X_RAPID_API_KEY;  // this one gets the env var value but for some reason its not working
    //const apiKey = process.VITE_X_RAPID_API_KEY;  // process is undefined

  
    const apiKey ="12f48501d5msh3fec3e1ca3e49e5p15cf7cjsn8e6a481e855f";
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        contentType: 'json',
        unitGroup: 'us',
        aggregateHours: '24',
        location: place,
        shortColumnNames: 0
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };
  
    console.log("Request Options:", options);  // Log the request details for debugging
    console.log("API Key:", apiKey);  // Ensure it's correctly loaded

    try {
      const res = await axios.request(options);
      console.log("API Response:", res.data);  // Log the response
      if (!res.data.locations || Object.keys(res.data.locations).length === 0) {
        toast.warn("Location not found. Please check the location name.");
        return;
      }
  
      const thisData = Object.values(res.data.locations);
      setLocation(thisData[0].address);
      setValues(thisData[0].values);
      setWeather(thisData[0].values[0]);
      toast.success(`${place}`);


    } catch (e) {
      console.error("Error fetching weather data:", e);
      toast.warn(`No such City ${place}`);
    }
  };
  
  

  useEffect(() => {
    console.log("Fetching weather for:", place);  // Log when place changes
    fetchWeather();
  }, [place]);
  
  return (
    <StateContext.Provider value={{ weather, values, place, setPlace, location }}>
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to access context
export const useStateContext = () => useContext(StateContext);
