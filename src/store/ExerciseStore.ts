import {create} from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
    videoId: string;
    calory: number;
    time: number;
};

type Actions = {
    setExercise: (videoId:string, calory:number, time:number) => void;
    removeExercise: () => void
};

const initialState: State = {
    videoId: '',
    calory: 0,
    time: 0
};

const ExerciseStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            setExercise: (videoId:string, calory:number, time:number) => set({ videoId:videoId, calory:calory, time:time}),
            removeExercise: () => set({ videoId:'', calory: 0, time: 0}),
        }),
        {name : "exercise", storage: createJSONStorage(() => localStorage)}
    )
);

export default ExerciseStore;