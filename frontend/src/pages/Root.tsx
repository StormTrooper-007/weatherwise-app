import {Outlet, useNavigate} from "react-router-dom";
import {Box, CssBaseline, ThemeProvider, Grid, Divider, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {lightTheme, darkTheme} from "../main.tsx";
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelapseIcon from '@mui/icons-material/Timelapse';


function Root() {

    const {colorMode} = useSelector((state: RootState) => state.appState)
    const navigate = useNavigate()

    return (
        <ThemeProvider theme={colorMode ? darkTheme : lightTheme}>
            <Paper elevation={5}>
                <Box sx={{flexGrow: 1}}>
                    <CssBaseline/>
                    <Grid container>
                        <Grid item xs={2} sx={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", height: "100vh", pb: 120}}>
                            <Box sx={{height: 100, mb: 5}} onClick={() => navigate("/")}>
                                <HomeIcon sx={{mt: 10, ml: 3}}/>
                            </Box>
                            <Divider/>
                            <Box sx={{height: 100, mb: 5}} onClick={() => navigate("/todos")}>
                                <ListAltIcon sx={{mt: 10, ml: 3}}/>
                            </Box>
                            <Divider/>
                            <Box sx={{height: 100, mb: 5}} onClick={() => navigate("/todo")}>
                                <CreateIcon sx={{mt: 10, ml: 3}}/>
                            </Box>
                            <Divider/>
                            <Box sx={{height: 100, mb: 5}}>
                                <TimelapseIcon sx={{mt: 10, ml: 3}} onClick={() => navigate("/timedouts")}/>
                            </Box>
                            <Divider/>
                            <Box sx={{height: 100, mb: 5}} onClick={() => navigate("/settings")}>
                                <SettingsIcon sx={{mt: 10, ml: 3}}/>
                            </Box>
                            <Divider/>
                        </Grid>
                        <Grid item xs={10}>
                            <Outlet/>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </ThemeProvider>
    );
}

export default Root;