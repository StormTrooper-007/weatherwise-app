import {Box, Typography, Paper, Button} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import {useEffect, useState} from "react"
import {useTime} from "react-timer-hook"
import dayjs from "dayjs";
import {WeatherInfo} from "../utils.tsx";
import {determineMood, calcCelsius, determineIcon} from "../functions.ts";
import Grid from '@mui/material/Grid';
import axios from "axios"
import {useSelector, useDispatch} from "react-redux";
import {removeCurrentUser} from "../features/slices/appSlice.ts";
import {RootState} from "../store.tsx";


type props = {
    weatherInfo: WeatherInfo
}


function Clock({weatherInfo}: props) {
    const [dayMood, setDayMood] = useState(false)
    const {currentUser} = useSelector((state: RootState) => state.appState)
    const {hours} = useTime()
    const dispatch = useDispatch()

    useEffect(() => {
        const updateBackgroundColor = () => {
            if (hours >= 6 && hours < 18) {
                setDayMood(true);
            } else if (hours >= 18) {
                setDayMood(false);
            } else if (hours === 0) {
                setDayMood(false);
            } else if (hours <= 5) {
                setDayMood(false);
            }
        }
        updateBackgroundColor();
        const interval = setInterval(updateBackgroundColor, 60000);

        return () => clearInterval(interval);
    }, [hours]);

    function logout() {
        location.reload()
        dispatch(removeCurrentUser())
        axios.get("/api/users/logout")
            .then(response => console.log(response.data))
            .catch(error => console.log("error occured: " + error))
    }

    return (
        <Box sx={{
            flexGrow: 1,
            p: 2,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            backgroundColor: determineMood(weatherInfo?.weather[0]?.main, dayMood)
        }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box sx={{height: 50}}>
                            <Box sx={{mb: 5}}>
                                <img src={determineIcon(dayMood, weatherInfo?.weather[0]?.main)} alt={"*"}/>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                <Button sx={{color: "white", textTransform: "none"}}
                                        startIcon={<PersonIcon/>}>
                                    {currentUser}
                                </Button>
                                <form onSubmit={logout}>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        size="small" sx={{textTransform: "none", fontWeight: 900}}>logout</Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant="h6" sx={{fontWeight: 900, color: "white"}}>
                            {calcCelsius(weatherInfo?.main.temp)}&#8451;
                        </Typography>
                        <Typography variant="h5" sx={{fontWeight: 900, color: "white"}}>
                            {weatherInfo?.name}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ml: 15}}>
                        <Paper
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.24)",
                                p: 2,
                                color: "white",
                                width: 200,
                                m: 1
                            }}>
                            <Typography variant="h6">{dayjs().format('dddd, MMMM D, YYYY h:mm A')}</Typography>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Clock;