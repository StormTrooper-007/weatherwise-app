import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store.ts";
import {createTheme, CssBaseline} from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

// Dark theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export {lightTheme, darkTheme};


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline/>
            <App/>
        </Provider>

    </React.StrictMode>,
)
