import {Outlet} from "react-router-dom";
import {Box, CssBaseline, ThemeProvider, Grid, Divider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {lightTheme, darkTheme} from "../main.tsx";
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateIcon from '@mui/icons-material/Create';


function Root() {

    const {colorMode} = useSelector((state: RootState) => state.appState)

    return (
        <ThemeProvider theme={colorMode ? darkTheme : lightTheme}>
            <Box sx={{flexGrow: 1}}>
                <CssBaseline/>
                <Grid container>
                    <Grid item xs={2} sx={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", height: "100vh", pb: 120}}>
                        <Box sx={{height: 200}}>
                            <HomeIcon sx={{mt: 10, ml: 2}}/>
                        </Box>
                        <Divider/>
                        <Box sx={{height: 200}}>
                            <ListAltIcon sx={{mt: 10, ml: 2}}/>
                        </Box>
                        <Divider/>
                        <Box sx={{height: 200}}>
                            <CreateIcon sx={{mt: 10, ml: 2}}/>
                        </Box>
                        <Divider/>
                    </Grid>
                    <Grid item xs={10}>
                        <Outlet/>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default Root;