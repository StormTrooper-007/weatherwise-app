import {createSlice, PayloadAction} from "@reduxjs/toolkit"


type LoginMessage = {
    success: string
    error: string
}

type TodoMessage = {
    success: string
    error: string
}

export const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        currentUser: "anonymousUser" as string,
        loginMessage: {
            success: "",
            error: ""
        },
        todoMessage: {
            success: "",
            error: ""
        },
        loginStatus: false
    },
    reducers: {
        getCurrentUser: {
            reducer: (state, action: PayloadAction<string>) => {
                state.currentUser = action.payload
            },
            prepare: (username: string) => {
                return {
                    payload: username
                };
            },
        },
        removeCurrentUser:
            (state) => {
                state.currentUser = "anonymousUser"
            },
        getLoginMessage: {
            reducer: (state, action: PayloadAction<LoginMessage>) => {
                state.loginMessage = action.payload
            },
            prepare: (success: string, error: string) => {
                return {
                    payload: {
                        success,
                        error
                    }
                };
            }
        },
        removeLoginMessage:
            (state) => {
                state.loginMessage = {
                    success: "",
                    error: ""
                }
            },
        getTodoMessage: {
            reducer: (state, action: PayloadAction<TodoMessage>) => {
                state.todoMessage = action.payload
            },
            prepare: (success: string, error: string) => {
                return {
                    payload: {
                        success,
                        error
                    }
                };
            }
        },
        removeTodoMessage:
            (state) => {
                state.todoMessage = {
                    success: "",
                    error: ""
                }
            },
        toggleLoginStatus:
            state => {
                state.loginStatus = !state.loginStatus
            }
    }
})

export const {
    getCurrentUser,
    removeCurrentUser,
    getLoginMessage,
    removeLoginMessage,
    getTodoMessage,
    removeTodoMessage,
    toggleLoginStatus
} = appSlice.actions

export default appSlice.reducer