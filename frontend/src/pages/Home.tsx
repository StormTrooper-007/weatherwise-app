import Clock from "../components/Clock.tsx";
import {useGetUpcomingQuery} from "../features/api/apiSlice.tsx";
import {Box, Grid, Typography, Alert} from "@mui/material";
import UpcomingTodoCard from "../components/UpcomingTodoCard.tsx";
import {useCallback, useEffect, useState} from "react";
import {calcCelsius} from "../functions.ts";
import axios from "axios";
import {WeatherInfo} from "../utils.tsx";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store.tsx";
import {
    toggleLoginStatus,
    getWeatherInfoMessage,
    toggleWeatherInfoMessage
} from "../features/slices/appSlice.ts";
import {useNavigate} from "react-router-dom";


function Home() {
    const {data, isLoading} = useGetUpcomingQuery()
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
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

    const {
        loginStatus,
        currentUser,
        weatherInfoMessage,
        showWeatherInfoMessage
    } = useSelector((state: RootState) => state.appState)
    const dispatch = useDispatch()
    const [errorM, setErrorM] = useState<string>("")

    const getCurrentWeatherInfo = useCallback(async () => {
        try {
            const res = await axios.get("/api/weather/48.1351/11.5820")
            await setWeatherInfo(res.data)
            dispatch(getWeatherInfoMessage("success", ""))
            dispatch(toggleWeatherInfoMessage())
        } catch (error: any) {
            setErrorM(error.message)
            dispatch(getWeatherInfoMessage("", error.message))
        }
    }, [])


    useEffect(() => {
        const source = axios.CancelToken.source()
        getCurrentWeatherInfo()
        return () => {
            source.cancel('component unmounted')
        }
    }, [getCurrentWeatherInfo])

    const navigate = useNavigate()

    if (isLoading) return (
        <img src="/icons8-dots-loading.gif" alt={"*"} style={{marginTop: 300, marginLeft: 150}}></img>)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <Box sx={{flexGrow: 1, minHeight: 200}}>
            {!loginStatus && <Alert severity="success" onClick={() => dispatch(toggleLoginStatus())}>
                logged in as {currentUser}
            </Alert>}
            {!showWeatherInfoMessage && <Alert severity="success" onClick={() => dispatch(toggleWeatherInfoMessage())}>
                {weatherInfo !== null && weatherInfoMessage.success}
            </Alert>}
            {errorM !== "" && <Alert severity="error" onClick={() => {
                setErrorM("")
            }}>
                {errorM}
            </Alert>}
            <Grid container>
                <Grid item xs={12}>
                    <Clock weatherInfo={weatherInfo}/>
                </Grid>
                <Grid item xs={12}
                      sx={{
                          background: 'url("/sunny.jpg")',
                          backgroundSize: 'cover',
                          height: "100vh",
                          backgroundPosition: 'center',
                      }}
                >
                    <Box sx={{backgroundColor: "rgba(255, 255, 255, 0.55)", m: 2, p: 1}}>
                        <Typography variant="h5"
                                    gutterBottom>Temperature:{calcCelsius(weatherInfo?.main.temp)} &#8451;</Typography>
                        <Typography variant="h5" gutterBottom>Feels
                            like:{calcCelsius(weatherInfo?.main.feels_like)} &#8451;</Typography>
                        <Typography variant="h5" gutterBottom>
                            Weather now: {weatherInfo?.weather[0]?.description}</Typography>
                        <Typography variant="h5" gutterBottom>Upcoming plans</Typography>
                    </Box>

                    {data?.map((upcoming) => (
                        <Box key={upcoming.id}
                             sx={{
                                 display: "flex",
                                 justifyContent: "space-between",
                             }}
                             onClick={() => navigate("/todos")}
                        >
                            <UpcomingTodoCard upcoming={upcoming}/>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;