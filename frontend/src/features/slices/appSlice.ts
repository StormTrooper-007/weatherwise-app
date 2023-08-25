import {createSlice, PayloadAction} from "@reduxjs/toolkit"


type LoginMessage = {
    success: string
    error: string
}

type TodoMessage = {
    success: string
    error: string
}

type WeatherInfoMessage = {
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
        weatherInfoMessage: {
            success: "",
            error: ""
        },
        loginStatus: false,
        showWeatherInfoMessage: false
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
        getWeatherInfoMessage: {
            reducer: (state, action: PayloadAction<WeatherInfoMessage>) => {
                state.weatherInfoMessage = action.payload
            },
            prepare: (success: string, error: string) => {
                return {
                    payload: {
                        success, error
                    }
                }
            }
        },
        removeWeatherInfoMessage:
            (state) => {
                state.weatherInfoMessage = {
                    success: "",
                    error: ""
                }
            },
        toggleLoginStatus:
            state => {
                state.loginStatus = !state.loginStatus
            },
        toggleWeatherInfoMessage:
            state => {
                state.showWeatherInfoMessage = !state.showWeatherInfoMessage
            },
    }
})


export const {
    getCurrentUser,
    removeCurrentUser,
    getLoginMessage,
    removeLoginMessage,
    getTodoMessage,
    removeTodoMessage,
    toggleLoginStatus,
    removeWeatherInfoMessage,
    getWeatherInfoMessage,
    toggleWeatherInfoMessage
} = appSlice.actions

export default appSlice.reducer