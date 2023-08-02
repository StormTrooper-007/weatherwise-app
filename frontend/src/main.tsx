import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux"
import {store} from "./store.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {blue, grey} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[800],
        },
        secondary: {
            main: grey[50],
        },
    },

    components: {
        MuiButton: {
            variants: [
                {
                    props: {variant: 'outlined'},
                    style: {
                        textTransform: "none",
                        padding: 2
                    }
                }
            ]
        },
    },

});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssBaseline/>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>

    </React.StrictMode>,
)
