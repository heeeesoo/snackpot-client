import {create} from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
    accessToken: string;
};

type Actions = {
    setToken: (accessToken : string) => void;
};

const initialState: State = {
    accessToken: ''
};

const TokenStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            setToken: (accessToken:string) => set({accessToken:accessToken})
        }),
        {name : "token", storage: createJSONStorage(() => localStorage)}
    )
);

export default TokenStore;