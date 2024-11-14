import { useEffect, useState } from "react";

// Enhanced Date Hook with more properties and functionalities
export const useDate = ({
  locale = "en", // Default locale, can be passed dynamically
  updateInterval = 60000, // Default update interval (in ms, 60 seconds)
  format = "full", // Full or custom format
} = {}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, updateInterval);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [updateInterval]);

  // Ensure the currentDate is a valid Date object
  if (!currentDate) return { day: "", date: "", time: "", dayNight: "" };

  // Get Day and Date with Locale Formatting
  const day = currentDate.toLocaleDateString(locale, { weekday: "long" });
  const month = currentDate.toLocaleDateString(locale, { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  // Get Time (with hours, minutes, seconds)
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  // Detect Day or Night (based on the hour of the day)
  const dayNight = hours >= 6 && hours < 18 ? "Day" : "Night";

  // Return the formatted date and time as per the selected format
  const formattedDate =
    format === "full"
      ? `${day}, ${month} ${date}, ${year}`
      : `${month} ${date}, ${year}`; // Example for a custom format

  return {
    day,
    date: formattedDate,
    time,
    dayNight,
  };
};
