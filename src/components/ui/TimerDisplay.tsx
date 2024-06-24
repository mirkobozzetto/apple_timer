import { Time } from "@/types/types";

interface TimerDisplayProps {
  time: Time;
  progress: number;
  formatTime: (time: Time) => string;
}

const TimerDisplay = ({ time, progress, formatTime }: TimerDisplayProps) => (
  <div className="relative w-80 h-80">
    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
      <circle
        className="text-gray-700"
        strokeWidth="2"
        stroke="currentColor"
        fill="transparent"
        r="48"
        cx="50"
        cy="50"
      />
      <circle
        className="text-purple-500"
        strokeWidth="2"
        strokeDasharray={2 * Math.PI * 48}
        strokeDashoffset={2 * Math.PI * 48 * (1 - progress)}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="48"
        cx="50"
        cy="50"
      />
    </svg>
    <div className="top-1/2 left-1/2 absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
      <div className="mb-2 font-bold text-6xl">{formatTime(time)}</div>
    </div>
  </div>
);

export default TimerDisplay;
