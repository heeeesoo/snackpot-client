import {create} from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
    isLoggedIn: boolean;
    username: string;
    userid: number;
};

type Actions = {
    login: () => void;
    logout: () => void;
    setUserName: (username : string) => void;
    setUserId: (userid : number) => void;
};

const initialState: State = {
    isLoggedIn: false,
    username: '',
    userid: -1
};

const UserStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
            setUserName: (username:string) => set({username:username}),
            setUserId: (userid:number) => set({userid:userid})
        }),
        {name : "user", storage: createJSONStorage(() => localStorage)}
    )
);

export default UserStore;