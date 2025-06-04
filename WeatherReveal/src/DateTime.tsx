import  { useEffect, useState } from 'react';


const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const options = {

    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  } as const;




  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);
  
  const formattedDateTime = currentTime.toLocaleString(undefined, options );

    return <div>{formattedDateTime}</div>;



};

export default DateTimeDisplay;