import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "../../utils.tsx";


export const timedOutSlice = createSlice({
    name: "timedOutSlice",
    initialState: {
        timedOuts: [] as Todo[],
        id: "" as string,
        isEditMode: false as boolean
    },
    reducers: {
        saveTimedOut: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.timedOuts.push(action.payload);
            },
            prepare: (id: string, plan: string, startTime: string, status: string, createdAt: string) => {
                return {
                    payload: {
                        id,
                        plan,
                        startTime,
                        status,
                        createdAt
                    },
                };
            },
        },
        getId: {
            reducer: (state, action: PayloadAction<string>) => {
                state.id = action.payload
                state.isEditMode = true
            },
            prepare(id: string) {
                return {
                    payload: id
                }
            }
        },
        removeId: (state) => {
            state.id = ""
            state.isEditMode = false
        }
    }
})

export const {
    saveTimedOut,
    getId,
    removeId
} = timedOutSlice.actions

export default timedOutSlice.reducer