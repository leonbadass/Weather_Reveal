import React,{useState}from "react";
import Locationform from "./Locationform";

function Weatherdata(){
    const apiKey = '7350367e9f3b19ef6d2187dc7553e936'
    const [cord, setCord] = useState(null);
    const [error, setError] =useState('');
    const [temp, setTemp] = useState(null);
    const [descript, setDescript]= useState('');
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const[location, setLocation] = useState('');

    const getCord = async (location)=>{
        const geoCodUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`
       try{
        const response = await fetch(geoCodUrl);
        const data = await response.json();
        
        if(data.length === 0){
            setError('Location not found');
            return;
        }

        const {state,country,lat,lon} = data[0];
        setCord({lat,lon});
        setCountry(country);
        setState(state)
        getTemp(lat,lon);

       }catch(err){
        setError('failed to fetch cordinates')
       }
    }

    const getTemp = async (lat, lon)=>{
        const getTempUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        try{
            const response = await fetch(getTempUrl);
            const tempData = await response.json();

            if(tempData.cod !== 200){
                setError(`Error: ${tempData.message}`)
                return;
            }
            setTemp(tempData.main.temp);
            setDescript(tempData.weather[0].description);

        }catch (err){
            setError('temp not found');
        }
    }
    const resetButton = (e)=>{
        setCord(null);
        setCountry(null);
        setError('');
        setDescript('');
        setState(null)
        setTemp(null);
        setLocation('');


    }
    return(<div>
        <Locationform
         onSubmit ={getCord}
        resetButton ={resetButton} 
        location={location} setLocation={setLocation} />
        {cord && (
            <div className="dataFetched">
                {location &&(<h2>{location}</h2>)}
            {country && (<h3>Country: {country}</h3>)}
            {state && (<h3>State: {state}</h3>)}
            {cord &&(<h3>Longitude: {cord.lon}° E <br></br> Latitiude: {cord.lat}° N</h3>)}
           {temp && ( <h3>Tempreture: {temp}°C</h3>)}
           {descript && (<h3>Weather Description: {descript}</h3>)}
            {error&&(<p>{error}</p>)}
            </div>
        )}
    </div>)
}

export default Weatherdata;