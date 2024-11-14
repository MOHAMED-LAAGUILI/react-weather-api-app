import Nav from "./components/Nav";
import { useStateContext } from "./contexts/WeatherContext";
import { useDate } from "./utils/useDate";
import { BackGroundLayout } from "./layouts";
import WeatherCard from "./components/WeatherCard";
import MiniCard from "./components/MiniCard";
import Spinner from "./components/Spinner";

export default function Component() {
  const { day, date, time, dayNight } = useDate({
    locale: "en-US",
    updateInterval: 1000,
    format: "full",
  });

  const { weather, location, values } = useStateContext();

  return (
    <BackGroundLayout>
      <div className="font-bold min-h-screen w-full pb-20">
        <Nav />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Current Weather</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <p className="text-lg font-medium">Date: {date}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <p className="text-lg font-medium">Time: {time}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <p className="text-lg font-medium">
                  Day/Night: {dayNight}
                  <span className="text-2xl ml-2">
                    {dayNight === "Night" ? "🌛" : "🌞"}
                  </span>
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <p className="text-lg font-medium">Today is: {day}</p>
              </div>
            </div>
          </div>

          {weather ? (
            <div className="space-y-12">
              <p className="text-2xl font-semibold text-center">Location: {location}</p>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* WeatherCard takes full width on small screens */}
                <div className="lg:col-span-1 sm:col-span-1 mx-auto flex justify-center">
                  <WeatherCard
                    temperature={weather.temp || 'N/A'}
                    windSpeed={weather.wspd || 'N/A'}
                    humidity={weather.humidity || 'N/A'}
                    place={location}
                    heatIndex={weather.heatIndex || 'N/A'}  
                    conditions={weather.conditions}
                  />
                </div>
                {/* Mini cards take the remaining space */}
                <div className="lg:col-span-3 sm:col-span-1">
                  <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">6-Day Forecast</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                      {values && values.length > 0 && values.slice(1, 7).map((val, i) => {
                        const date = new Date(val.datetimeStr);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

                        return (
                          <MiniCard
                            key={i}
                            day={dayName || 'N/A'}
                            iconString={val.conditions || '❓'}
                            temp={val.temp || 'N/A'}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <Spinner/>
            </div>
          )}
        </main>
      </div>
    </BackGroundLayout>
  );
}

