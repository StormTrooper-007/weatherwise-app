import Clock from "../components/Clock.tsx";
import {useGetUpcomingQuery} from "../features/api/apiSlice.tsx";
import {Box, Grid, Typography} from "@mui/material";
import UpcomingTodoCard from "../components/UpcomingTodoCard.tsx";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {WeatherInfo} from "../utils.tsx";
import annyang from 'annyang';

function Home() {
    const {data, isLoading} = useGetUpcomingQuery()
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>()

    const getCurrentWeatherInfo = useCallback(async () => {
        try {
            const res = await axios.get("/api/weather/48.1351/11.5820")
            await setWeatherInfo(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const speakText = (text: string) => {
        const synth = window.speechSynthesis;
        if (synth.speaking) {
            console.error('SpeechSynthesisUtterance is already in progress.');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text)
        synth.speak(utterance)
    };


    console.log(weatherInfo)
    const speakWeatherInfo = () => {
        if (weatherInfo) {
            const weather = weatherInfo?.weather.find((info: {
                id: number,
                main: string,
                description: string
            }) => info.main)
            speakText(`Hello there! Hope you are having a wonderful day? Just a short summary of the weather today...We are having
            ${weather?.description} today, the temperature today is
            ${weatherInfo.main.temp} however it feels like
            ${weatherInfo.main.feels_like}. Remember to plan your day accordingly. Have a wonderful day!`)
        }
    }

    function handleStart() {
        if (annyang) {
            const commands = {
                "weather today": () => speakWeatherInfo(),
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            annyang.addCommands(commands);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            annyang.start();
        }
    }

    handleStart()

    useEffect(() => {
        const source = axios.CancelToken.source()
        getCurrentWeatherInfo()
        return () => {
            source.cancel('component unmounted')
        }
    }, [getCurrentWeatherInfo])

    if (isLoading) {
        return (<img src="/icons8-dots-loading.gif" alt={"*"} style={{marginTop: 300, marginLeft: 150}}></img>)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <Box sx={{flexGrow: 1, minHeight: 200}} onClick={speakWeatherInfo}>
            <Grid container>
                <Grid item xs={12}>
                    <Clock weatherInfo={weatherInfo}/>
                </Grid>
                <Grid item xs={12} sx={{backgroundColor: "#708090", minHeight: "100vh"}}>
                    <Typography variant="h3">Upcoming</Typography>
                    {data?.map((upcoming) => (
                        <Box key={upcoming.id}
                             sx={{
                                 display: "flex",
                                 justifyContent: "space-between",
                             }}
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