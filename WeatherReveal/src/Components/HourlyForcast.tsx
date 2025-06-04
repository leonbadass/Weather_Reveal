import  { useEffect, useState } from 'react';
import type { ForecastItem } from '../types';

type HourlyForecastProps = {
  lat: number;
  lon: number;
  apiKey: string;
};



export default function HourlyForecast({ lat, lon, apiKey }: HourlyForecastProps) {
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();

        if (data.cod !== "200") {
          throw new Error(data.message);
        }

        setForecastData(data.list.slice(0, 6)); // First 24 hours (3h interval)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch forecast');
      }
    };

    fetchForecast();
  }, [lat, lon, apiKey]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div >
      <h2 className="text-xl font-semibold mb-4 text-center">Next 24 Hours Forecast</h2>
      <div className="flex flex-1 gap-4 flex-wrap justify-center">
        {forecastData.map((item) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div key={item.dt} className="bg-blue-100 rounded-lg p-2 text-center shadow w-30">
              <p>{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />
              <p>{Math.round(item.main.temp)}°C</p>
              <p className="text-sm">{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
