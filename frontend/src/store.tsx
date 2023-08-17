import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./features/api/apiSlice.tsx";
import appReducer from "./features/slices/appSlice.ts"

const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const localStorageMiddleware = ({getState}: any) => {
    return (next: any) => (action: any) => {
        const result = next(action);
        localStorage.setItem('applicationState', JSON.stringify(getState()));
        return result;
    };
};
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        appState: appReducer
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, localStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>;