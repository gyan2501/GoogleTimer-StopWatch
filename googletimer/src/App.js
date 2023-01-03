
import './App.css';
import { useState } from 'react';
import StopWatch from './Components/Stopwatch';
import Timer from './Components/Timer';

function App() {
  const [display, setDisplay] = useState(true);
  return (
    <>
    <h1 className="h-tag">Timer And Stopwatch</h1>
    <div className="App">
      <div className="button-box">
        <button onClick={() => setDisplay(true)}>Timer</button>
        <button onClick={() => setDisplay(false)}>Stopwatch</button>
      </div>
      {
        display ?
          <div className="timer">
            <Timer />
          </div> :
          <div className="stopwatch">
            <StopWatch />
          </div>
      }
    </div>
    </>
  );
}

export default App;
