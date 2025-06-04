

interface WeatherFormProps {
  cityName: string;
  setCityName: (value: string) => void;
  getCord: ()=>  Promise<Error | void>;
 
}

export default function WeatherForm ({cityName , setCityName, getCord}: WeatherFormProps){
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCityName(e.target.value)
    }
    const handleClick=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        getCord()
    }

    return(<>
    <form className="flex h-10 md:h-12 " onSubmit={(e)=>handleClick(e)}>
        <label htmlFor='city-input' className="sr-only ">Search Country</label>
        <input type="text" id="city-input" placeholder="Search City" onChange={handleChange} value={cityName} className="bg-blue-100 w-60% flex-2 rounded-l-xl" />
        <button type="submit" className="flex-1 rounded-r-xl bg-blue-200 hover:bg-blue-400" >Get Weather</button>
    </form>
    </>)
}