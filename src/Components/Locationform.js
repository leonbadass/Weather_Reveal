import React,{useState} from "react";

function Locationform({onSubmit, resetButton,location, setLocation}){
    
    const placeholder = "Enter location to get weather forcast";
    const handleChange = (e)=> setLocation(e.target.value);
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit(location);
        
    }
    return(<div><form onSubmit={handleSubmit}>
        <input type='text' placeholder={placeholder} onChange={handleChange} value={location}/>
        <button type='submit'>Get Weather</button>
        <button type="button" onClick={resetButton}>Reset Data</button>
    </form>
    </div>)
}

export default Locationform;