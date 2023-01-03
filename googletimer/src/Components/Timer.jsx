import { useEffect, useState } from "react";

import style from "./Timer.module.css";

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hr, setHr] = useState(0);
  const [timeOn, setTimeOn] = useState(false);

  useEffect(() => {
    var idhr = null;
    var idmin = null;
    var idsec = null;
    if (timeOn) {
      idsec = setInterval(() => {
        if (sec <= 0) {
          setSec(0);
        } else {
          setSec((prev) => prev - 1);
        }
        if (sec < 0) {
          clearInterval(idsec);
        }
      }, 1000);
      if (sec === 0 && min !== 0) {
        clearInterval(idsec);
        idmin = setInterval(() => {
          setMin((prev) => prev - 1);
          if (min === 0) {
            clearInterval(idmin);
          } else {
            setSec(60);
          }
        }, 1000);
      }
      if (min === 0 && hr !== 0) {
        idhr = setInterval(() => {
          setHr((prev) => prev - 1);
          if (hr === 0) {
            clearInterval(idhr);
          } else {
            setMin(60);
          }
        }, 1000);
      }
      if (hr === 0) {
        clearInterval(idhr);
      }
      if (hr === 0 && min === 0 && sec === 0) {
        clearInterval(idhr);
        clearInterval(idmin);
        clearInterval(idsec);
      }
    } else {
      clearInterval(idsec);
      clearInterval(idmin);
      clearInterval(idhr);
    }

    return () => {
      clearInterval(idsec);
      clearInterval(idmin);
      clearInterval(idhr);
    };
  }, [hr, min, sec, timeOn]);

  const handleStart = () => {
    setTimeOn(true);
  };

  const handleReset = () => {
    setHr(0);
    setMin(0);
    setSec(0);
    setTimeOn(false);
  };

  const handleStop = () => {
    setTimeOn(false);
  };

  return (
    <div className={style.timer}>
      <h1>Timer</h1>
      <div className={style.box}>
        <input
          type="number"
          placeholder="00h"
          onChange={(e) => setHr(parseInt(e.target.value))}
          value={hr}
        />
        hr :{" "}
        <input
          type="number"
          placeholder="00m"
          onChange={(e) => setMin(parseInt(e.target.value))}
          value={min}
        />
        min :{" "}
        <input
          type="number"
          placeholder="00s"
          onChange={(e) => setSec(parseInt(e.target.value))}
          value={sec}
        />
        sec
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
