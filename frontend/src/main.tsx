import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux"
import {store} from "./store.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {orange, red, yellow} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: orange[800],
        },
        secondary: {
            main: red[800],
        },
        background: {
            default: yellow[50]
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: {variant: 'contained'},
                    style: {
                        textTransform: "none"
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
