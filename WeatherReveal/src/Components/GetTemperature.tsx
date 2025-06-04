import { useEffect, useState } from "react";


type Props = {
  apiKey: string;
  lat: number | null;
  lon: number | null;
};
 const GetTemperature: React.FC<Props> = ({ apiKey, lat, lon })=>{
    
    const [temp, setTemp] = useState(null)
    const [tempInfo, setTempInfo] = useState('')
    const [tempIcon,setTempIcon] = useState(null)
    const getTempUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    useEffect(()=>{
        const getTempData = async ()=>{
            try{
        const response = await fetch(getTempUrl);
        const tempData = await response.json();
        if(tempData.cod !== 200){
            throw new Error('Cordinates not found!')
        }
        
        setTemp(tempData.main.temp);
        setTempInfo(tempData.weather[0].description)
        setTempIcon(tempData.weather[0].icon)

    }catch(error){
        return error;
    }


        }

        getTempData();
    },[lat])

    return(<>

    {temp&&<p className="font-bold text-4xl">{Math.round(temp)}°C</p>}
    <img
                src={`https://openweathermap.org/img/wn/${tempIcon}@2x.png`}
                alt={tempInfo}
                className="mx-auto"
              />
    {tempInfo&&<p className=" text-xl">{tempInfo}</p>}

    </>

    )
 

}
export default GetTemperature;