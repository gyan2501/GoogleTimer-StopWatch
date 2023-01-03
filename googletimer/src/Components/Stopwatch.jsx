import { useEffect, useRef, useState } from "react";

import style from "./Timer.module.css";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);

  const timer = useRef(null);

  useEffect(
    (timer) => {
      if (timerOn) {
        timer = setInterval(() => {
          setTime((prev) => prev + 10);
        }, 10);
      } else if (!timerOn) {
        clearInterval(timer);
      }
      return () => {
        clearInterval(timer);
      };
    },
    [timerOn]
  );

  const handleStart = () => {
    setTimeOn(true);
  };

  const handleReset = () => {
    setTime(0);
    setTimeOn(false);
  };

  const handleStop = () => {
    setTimeOn(false);
  };

  return (
    <div className={style.StopWatch}>
      <h1>Stopwatch</h1>
      <div ref={timer} className={style.time}>
        <span>{("0" + Math.floor((time / 600000) % 60)).slice(-2)} h :</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)} m :</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)} s :</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)} ms</span>
      </div>
      <div className={style.b}>
        <button className={style.start} onClick={handleStart}>
          START
        </button>
        <button className={style.stop} onClick={handleStop}>
          STOP
        </button>
        <button className={style.reset} onClick={handleReset}>
          RESET
        </button>
      </div>
    </div>
  );
}
