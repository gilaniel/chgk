import { useState, useRef } from "react";
import { Button } from "./ui/button";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60); // Начальное значение в секундах
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Функция для форматирования времени в mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  return (
    <>
      <input
        className=" bg-white rounded-[8px] px-3 py-2 w-[100px]"
        type="text"
        value={formatTime(timeLeft)}
        readOnly
        placeholder="mm:ss"
        style={{ width: "100px", textAlign: "center" }}
      />
      <Button onClick={start}>Start</Button>
    </>
  );
};

export default Timer;
