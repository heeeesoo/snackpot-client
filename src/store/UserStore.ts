import {create} from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
    isLoggedIn: boolean;
};

type Actions = {
    login: () => void;
    logout: () => void
};

const initialState: State = {
    isLoggedIn: false,
};

const UserStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
        }),
        {name : "global", storage: createJSONStorage(() => localStorage)}
    )
);

export default UserStore;