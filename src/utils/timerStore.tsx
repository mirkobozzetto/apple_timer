import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  interval?: NodeJS.Timeout;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;
  setMilliseconds: (milliseconds: number) => void;
}

const timerStore = createStore<TimerState>((set, get) => ({
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  startTimer: () => {
    if (get().interval) return;
    const interval = setInterval(() => {
      set((state) => {
        let newMilliseconds = (state.milliseconds + 100) % 1000;
        let newSeconds = state.seconds;
        let newMinutes = state.minutes;
        let newHours = state.hours;

        if (newMilliseconds < state.milliseconds) {
          newSeconds = (state.seconds + 1) % 60;
          if (newSeconds < state.seconds) {
            newMinutes = (state.minutes + 1) % 60;
            if (newMinutes < state.minutes) {
              newHours = (state.hours + 1) % 24;
            }
          }
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
          milliseconds: newMilliseconds,
        };
      });
    }, 100);
    set({ interval });
  },
  stopTimer: () => {
    if (get().interval) {
      clearInterval(get().interval);
      set({ interval: undefined });
    }
  },
  resetTimer: () => {
    if (get().interval) {
      clearInterval(get().interval);
    }
    set({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      interval: undefined,
    });
  },
  setHours: (hours: number) => set({ hours }),
  setMinutes: (minutes: number) => set({ minutes }),
  setSeconds: (seconds: number) => set({ seconds }),
  setMilliseconds: (milliseconds: number) => set({ milliseconds }),
}));

export const useTimerStore = () => useStore(timerStore);
