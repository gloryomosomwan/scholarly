import { create } from 'zustand';

interface CalendarStateStore {
  currentDate: Date;
  previousDate: Date;
  todayDate: Date;
  daySelectDate: (date: Date) => void;
  weekSelectDate: (date: Date) => void;
  monthSelectDate: (date: Date) => void;
  selectToday: () => void;
  selectPreviousDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarStateStore>((set, get) => ({
  currentDate: new Date(),
  previousDate: new Date(),
  todayDate: new Date(),
  daySelectDate: (date: Date) => set({ currentDate: date }),
  weekSelectDate: (date: Date) => set({ currentDate: date }),
  monthSelectDate: (date: Date) => set({ currentDate: date }),
  selectToday: () => set((state) => ({ currentDate: state.todayDate })),
  selectPreviousDate: (date: Date) => set({ previousDate: date }),
}));