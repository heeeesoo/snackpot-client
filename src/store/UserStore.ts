import {create} from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
    isLoggedIn: boolean;
    username: string;
};

type Actions = {
    login: () => void;
    logout: () => void;
    setUserName: (username : string) => void;
};

const initialState: State = {
    isLoggedIn: false,
    username: ''
};

const UserStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
            setUserName: (username:string) => set({username:username})
        }),
        {name : "user", storage: createJSONStorage(() => localStorage)}
    )
);

export default UserStore;