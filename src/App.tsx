import { useState } from 'react';
import useLocalStorageState from "use-local-storage-state";
import './App.css'
import WeatherForm from './WeatherForm';
import type { CityData } from './types';
import GetTemperature from './Components/GetTemperature';
import HourlyForecast from './Components/HourlyForcast';
import DailyForecast  from './Components/DailyForcast';
import DateTimeDisplay from './DateTime';



function App() {
  const apiKey: string= '7350367e9f3b19ef6d2187dc7553e936'
  const [cityName, setCityName] = useLocalStorageState<string > ('city-name',{
    defaultValue: ''
  });
  const [cityData , setCityData] = useState <CityData>({ 
    state: null,
    country: null,
    lat:  null,
  lon: null,
  submited: false,
  name: null
  });
  




    const getCord = async(): Promise<Error| void>=>{
      if(!cityName)return;
       const geoCodUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
      try {
      
          const response = await fetch(geoCodUrl);
        const data = await response.json();

        if (data.length === 0) {
          throw new Error ('Location not found');
          
        }

        const { state: stateName, country: countryName, lat, lon ,name: cityName} = data[0];

        setCityData(
          {
            state: stateName,
            country: countryName,
            lat,
            lon,
            submited: true,
            name: cityName
          }
        )
       
      } catch (err ) {
        if(err instanceof Error){
       console.log(err);
       return err;
      }
    }
  
    }

  
    



  

  return (
    <div className='flex flex-col justify-center my-4  bg-red items-center'>
     <h1 className='text-xl mb-8' >Weather Reveal </h1>
     <div className= 'w-[80%] md:w-1/2 '>
      <WeatherForm cityName ={cityName} setCityName ={setCityName} getCord = {getCord} />
     </div>
     {cityData.submited &&<div className='flex flex-col items-center gap-1'>
      <p  className='font-bold text-2xl mt-4 tracking-wider'>{cityData.name?.toUpperCase()}</p>
      <p>{cityData.state},{cityData.country}</p>
      <DateTimeDisplay/>
  
    </div>}
     
    
     <GetTemperature lat={cityData.lat} lon={cityData.lon} apiKey={apiKey} />
     <div>
     {cityData.lat && cityData.lon &&<HourlyForecast lat={cityData.lat} lon={cityData.lon} apiKey={apiKey} />}
     </div>
     {cityData.lat && cityData.lon &&<DailyForecast lat={cityData.lat} lon={cityData.lon} apiKey={apiKey}/>}
    

    </div>
  )
}

export default App
