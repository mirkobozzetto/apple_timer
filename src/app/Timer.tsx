import { useTimerStore } from "@/utils/timerStore";

const Timer = () => {
  const { seconds, startTimer, stopTimer, resetTimer } = useTimerStore();

  return (
    <div className="timer">
      <h1>{seconds}</h1>
      <div className="flex space-x-2">
        {/* <button onClick={startTimer}>Start</button> */}
        {/* <button onClick={stopTimer}>Stop</button> */}
        {/* <button onClick={resetTimer}>Reset</button> */}
      </div>
    </div>
  );
};

export default Timer;
