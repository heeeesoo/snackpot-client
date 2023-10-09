import {create} from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
    groupCode: string;
};

type Actions = {
    setGroupCode: (accessToken : string) => void;
};

const initialState: State = {
    groupCode: ''
};

const GroupCodeStore = create<State & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            setGroupCode: (groupCode:string) => set({groupCode:groupCode})
        }),
        {name : "groupCode", storage: createJSONStorage(() => sessionStorage)}
    )
);

export default GroupCodeStore;