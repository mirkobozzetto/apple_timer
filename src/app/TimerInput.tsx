import { useTimerStore } from "@/utils/timerStore";
import clsx from "clsx";
import { KeyboardEvent, useRef, useState } from "react";

type TimeUnit = "hours" | "minutes" | "seconds";

const TimeInput = () => {
  const { hours, minutes, seconds, setHours, setMinutes, setSeconds } =
    useTimerStore();
  const [focusedUnit, setFocusedUnit] = useState<TimeUnit | null>(null);

  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (unit: TimeUnit, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      let newValue = numValue;
      if (unit === "hours" && newValue > 23) newValue = 23;
      if ((unit === "minutes" || unit === "seconds") && newValue > 59)
        newValue = 59;

      switch (unit) {
        case "hours":
          setHours(newValue);
          break;
        case "minutes":
          setMinutes(newValue);
          break;
        case "seconds":
          setSeconds(newValue);
          break;
      }
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    unit: TimeUnit
  ) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const increment = e.key === "ArrowUp" ? 1 : -1;
      const currentValue =
        unit === "hours" ? hours : unit === "minutes" ? minutes : seconds;
      let newValue = (currentValue + increment + 60) % 60;

      if (unit === "hours") {
        newValue = (currentValue + increment + 24) % 24;
      }

      handleInputChange(unit, newValue.toString());
    } else if (e.key === "ArrowLeft") {
      if (unit === "minutes") hoursRef.current?.focus();
      if (unit === "seconds") minutesRef.current?.focus();
    } else if (e.key === "ArrowRight") {
      if (unit === "hours") minutesRef.current?.focus();
      if (unit === "minutes") secondsRef.current?.focus();
    }
  };

  const inputClass = (unit: TimeUnit) =>
    clsx(
      "w-16 bg-transparent text-gray-100 text-4xl font-bold focus:outline-none text-center",
      "transition-colors duration-200 ease-in-out",
      {
        "bg-purple-700 rounded": focusedUnit === unit,
      }
    );

  return (
    <div className="flex items-center space-x-2 border-gray-700 bg-gray-800 p-4 border rounded-lg">
      <input
        ref={hoursRef}
        type="text"
        value={hours.toString().padStart(2, "0")}
        onChange={(e) => handleInputChange("hours", e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, "hours")}
        onFocus={() => setFocusedUnit("hours")}
        onBlur={() => setFocusedUnit(null)}
        className={inputClass("hours")}
        maxLength={2}
      />
      <span className="font-bold text-4xl text-gray-100">:</span>
      <input
        ref={minutesRef}
        type="text"
        value={minutes.toString().padStart(2, "0")}
        onChange={(e) => handleInputChange("minutes", e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, "minutes")}
        onFocus={() => setFocusedUnit("minutes")}
        onBlur={() => setFocusedUnit(null)}
        className={inputClass("minutes")}
        maxLength={2}
      />
      <span className="font-bold text-4xl text-gray-100">:</span>
      <input
        ref={secondsRef}
        type="text"
        value={seconds.toString().padStart(2, "0")}
        onChange={(e) => handleInputChange("seconds", e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, "seconds")}
        onFocus={() => setFocusedUnit("seconds")}
        onBlur={() => setFocusedUnit(null)}
        className={inputClass("seconds")}
        maxLength={2}
      />
    </div>
  );
};

export default TimeInput;
