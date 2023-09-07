import {Box, Typography, Paper, Button, Grid} from "@mui/material"
import {useState, useEffect, FormEvent} from "react";
import PersonIcon from '@mui/icons-material/Person'
import {useTime} from "react-timer-hook"
import dayjs from "dayjs";
import {determineMood, determineIcon, calcCelsius} from "../functions.ts";
import {WeatherInfo} from "../utils.tsx";
import {useNavigate} from "react-router-dom";


type props = {
    currentUser: string
    weatherInfo: WeatherInfo
    logOut: (e: FormEvent) => void
}

function WeatherDisplay({currentUser, weatherInfo, logOut}: props) {
    const [dayMood, setDayMood] = useState(false)
    const {hours} = useTime()
    const navigate = useNavigate()

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
                                {
                                    currentUser === "anonymousUser" ?
                                        <Button
                                            onClick={() => navigate("/login")}
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                            sx={{textTransform: "none", fontWeight: 900, width: 50, ml: 10}}
                                        >
                                            login
                                        </Button>
                                        :
                                        <form onSubmit={logOut}>
                                            <Button
                                                type="submit"
                                                color="primary"
                                                variant="contained"
                                                size="small" sx={{textTransform: "none", fontWeight: 900}}>
                                                logout
                                            </Button>
                                        </form>
                                }
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
                                minWidth: 200,
                                m: 1,
                            }}>
                            <Typography variant="h6" sx={{
                                fontFamily: "Stick No Bills",
                                fontWeight: 900
                            }}>{dayjs().format('dddd, MMMM D, YYYY h:mm A')}</Typography>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default WeatherDisplay;