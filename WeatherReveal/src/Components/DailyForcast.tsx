import { useEffect, useState } from 'react';
import type { ForecastItem, DailyForecast } from '../types';

type WeeklyForecastProps = {
  lat: number;
  lon: number;
  apiKey: string;
};



export default function WeeklyForecast({ lat, lon, apiKey }: WeeklyForecastProps) {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = await res.json();

        if (data.cod !== "200") throw new Error(data.message);

        const dailyMap: Record<string, ForecastItem[]> = {};

        data.list.forEach((item: ForecastItem) => {
          const day = item.dt_txt.split(' ')[0];
          if (!dailyMap[day]) dailyMap[day] = [];
          dailyMap[day].push(item);
        });

        const dailyForecast: DailyForecast[] = Object.entries(dailyMap)
          .slice(0, 6) // 6 days max
          .map(([date, items]) => {
            const midIndex = Math.floor(items.length / 2);
            const target = items[midIndex];

            return {
              date: new Date(date).toLocaleDateString(undefined, { weekday: 'long' }),
              temp: target.main.temp,
              description: target.weather[0].description,
              icon: target.weather[0].icon,
            };
          });

        setForecast(dailyForecast);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch weekly forecast');
      }
    };

    fetchForecast();
  }, [lat, lon, apiKey]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 ">
      <h2 className="text-xl font-semibold mb-4 text-center">6-Day Forecast</h2>
      <div className="flex flex-1 gap-4 flex-wrap justify-center">
        {forecast.map((day) => (
          <div key={day.date} className="bg-pink-200 rounded shadow p-3 text-center w-30">
            <p className="font-bold">{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              className="mx-auto"
            />
            <p className="text-lg font-medium">{Math.round(day.temp)}°C</p>
            <p className="text-sm text-gray-600">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
