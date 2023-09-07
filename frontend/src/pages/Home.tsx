import axios from "axios";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {calcCelsius} from "../functions.ts";
import {Box, Grid, Alert, Typography, Divider, Paper} from "@mui/material"
import WeatherDisplay from "../components/WeatherDisplay.tsx";
import {WeatherInfo} from "../utils.tsx";
import {Todo} from "../utils.tsx";
import UpcomingCard from "../components/UpcomingCard.tsx";


function Home() {

    const [currentUser, setCurrentUser] = useState<string>("")
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>(
        {
            coord: {
                lat: 0,
                long: 0,
            },
            main: {
                temp: 0,
                feels_like: 0,
                temp_min: 0,
                temp_max: 0,
            },
            weather: [],
            clouds: {
                all: 0
            },
            name: ""
        })
    const [upcomingTodos, setUpComingTodos] = useState<Todo[]>([])
    const [loginSuccessM, setLoginSuccessM] = useState<string>("")
    const [errorM, setErrorM] = useState<string>("")

    function getUpcomingPlans() {
        axios.get("/api/todos/upcoming")
            .then(response => setUpComingTodos(response.data))
            .catch(error => {
                    setErrorM(error.response.data.status + ": could not fetch upcoming todos")
                    setTimeout(() => {
                        setErrorM("")
                    }, 3000)
                }
            )
    }


    function getUser() {
        axios.get("/api/users/user")
            .then(response => {
                setCurrentUser(response.data)
                setLoginSuccessM(`logged in as`)
                setTimeout(() => {
                    setLoginSuccessM("")
                }, 3000)
            })
            .catch(error => {
                setErrorM("server error (" + error.response.data.error + "): could not get user")
                setTimeout(() => {
                    setErrorM("")
                }, 3000)
            })
    }

    function logOut(e: FormEvent) {
        e.preventDefault()
        axios.get("/api/users/logout")
            .then(response => {
                setCurrentUser(response.data)
            })
            .catch(error => {
                setErrorM(error.response.data)
                setTimeout(() => {
                    setErrorM("")
                }, 3000)
            })
    }

    const getCurrentWeatherInfo = useCallback(async () => {
        axios.get("/api/weather/48.1351/11.5823")
            .then((response) => setWeatherInfo(response.data))
            .catch(error => {
                console.log(error.response.data)
                setTimeout(() => {
                    setErrorM("")
                }, 3000)
            })
    }, [])

    useEffect(() => {
        const source = axios.CancelToken.source()
        getCurrentWeatherInfo()
        return source.cancel("component unmounted")
    }, [getCurrentWeatherInfo])

    useEffect(() => {
        getUser()
        getUpcomingPlans()
    }, [])

    return (
        <>
            <Box sx={{flexGrow: 1, minHeight: 200}}>
                {loginSuccessM !== "" && currentUser !== "anonymousUser" && <Alert variant="filled" severity="success">
                    {loginSuccessM + " " + currentUser}
                </Alert>}
                {errorM !== "" && <Alert variant="filled" severity="error">{errorM}</Alert>}
                <Grid container>
                    <Grid item xs={12}>
                        <WeatherDisplay currentUser={currentUser} weatherInfo={weatherInfo} logOut={logOut}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{m: 2, p: 1, display: "flex", flexDirection: "column"}}>
                            <Paper elevation={3} sx={{height: 80, width: "100%", p: 2}}>
                                <Typography variant="h6"> Temperature </Typography>
                                <Typography
                                    sx={{fontFamily: 'Stick No Bills'}}> {calcCelsius(weatherInfo?.main.temp)} &#8451; </Typography>
                            </Paper>
                            <Paper elevation={3} sx={{height: 80, width: "100%", p: 2, mt: 2}}>
                                <Typography variant="h6">Feels like</Typography>
                                <Typography
                                    sx={{fontFamily: 'Stick No Bills'}}>{calcCelsius(weatherInfo?.main.feels_like)}
                                    &#8451;
                                </Typography>
                            </Paper>
                            <Paper elevation={3} sx={{height: 80, width: "100%", p: 2, mt: 2}}>
                                <Typography variant="h6">Overview</Typography>
                                <Typography
                                    sx={{fontFamily: 'Stick No Bills'}}>{weatherInfo?.weather[0]?.description}</Typography>
                            </Paper>
                        </Box>
                        <Box sx={{m: 2}}>
                            <Divider/>
                            <Box>
                                <Typography variant={"h6"}>Upcoming Plans</Typography>
                                <Divider/>
                                {upcomingTodos.length === 0 ? <Alert sx={{mt: 2}} variant="filled" severity="warning">
                                    you currently don't have any upcoming plans
                                </Alert> : null}
                                {upcomingTodos.map(todo => <UpcomingCard todo={todo} key={todo.id}/>)}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>

    );
}

export default Home;


