export type CityData =  {
  state: string| null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  submited: boolean;
  name: string | null;
  

}


type ForecastItem = {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
  dt_txt: string;
};

type DailyForecast = {
  date: string;
  temp: number;
  description: string;
  icon: string;
};

type DateOptions ={
   weekday:{weekday: string},
    date :{ day: string },
    year: { month: string, year: string },
    time: {hour: string, minute: string,second: string, timeZoneName: string}

}