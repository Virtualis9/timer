import './App.css';
import React, {useState, useEffect, useRef} from 'react'

interface time {
  time: number,
  state: boolean
}

function App() {
  const startTimeRef = useRef(0);
  const intervalIdRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const[ElapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current); 
    }
  
    return () => {
      clearInterval(intervalIdRef.current); 
    };
  }, [isRunning]); 

  const stop = () =>{
    setIsRunning(false)
  }

  const start = () =>{
    setIsRunning(true)
    startTimeRef.current = Date.now() 
    

  }

  const restart = () =>{
    setElapsedTime(0);
    setIsRunning(false);
    

  }

  const formatTime = () =>{

    let hours = Math.floor(ElapsedTime / (1000 * 60 * 60))
    let minutes = Math.floor(ElapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(ElapsedTime / (1000) % 60);
    let miliseconds = Math.floor(ElapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0")

    return `${minutes}:${seconds}:${miliseconds}`;

  }


  return (
    <div className="container">
      <div className='timer'>{formatTime()}</div>
      <div className='controls'>
        <button onClick={start} className='button-start'>Start</button>
        <button onClick={restart} className='button-restart'>Restart</button>
        <button onClick={stop} className='button-stop'>Stop</button>
      </div>
    </div>
  );
}

export default App;
