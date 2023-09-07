import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    colorMode: boolean
    id: string
    todoEdit: {
        plan: string
        startTime: string
    }
}

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        colorMode: false as boolean,
        id: "" as string,
        todoEdit: {plan: "", startTime: ""} as {
            plan: string
            startTime: string
        }
    } as InitialState,
    reducers: {
        toggleMode: (state) => {
            state.colorMode = !state.colorMode
        },
        getId: {
            reducer: (state, action: PayloadAction<string>) => {
                state.id = action.payload
            },
            prepare: (id: string) => {
                return {
                    payload: id
                }
            }
        },
        removeId:
            (state) => {
                state.id = ""
            },
        setEditTodo: {
            reducer: (state, action: PayloadAction<{ plan: string, startTime: string }>) => {
                state.todoEdit = action.payload
                console.log(state.todoEdit)
            },
            prepare: (plan: string, startTime: string) => {
                return {
                    payload: {
                        plan,
                        startTime
                    }
                }

            }
        },

        removeEditTodo: (state) => {
            state.todoEdit = {plan: "", startTime: ""}
        }
    }
})

export const {
    toggleMode,
    getId,
    removeId,
    setEditTodo,
    removeEditTodo
} = appSlice.actions

export default appSlice.reducer