import {useParams, useNavigate} from "react-router-dom";
import {useGetTodosQuery} from "../features/api/apiSlice.tsx";
import {Button, CardMedia, Typography, CardActions, CardContent, Card, Box} from "@mui/material";
import dayjs from "dayjs";
import {useCallback, useEffect, useState} from "react";
import {WeatherInfo} from "../utils.tsx";
import axios from "axios";

function TodoView() {
    const {Id} = useParams();
    const {data, isLoading} = useGetTodosQuery();
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

    const getCurrentWeatherInfo = useCallback(async () => {
        try {
            const res = await axios.get("/api/weather/48.1351/11.5820")
            await setWeatherInfo(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        const source = axios.CancelToken.source()
        getCurrentWeatherInfo()
        return () => {
            source.cancel('component unmounted')
        }
    }, [getCurrentWeatherInfo])


    function getBackGroundColor(weather: string) {
        const weatherIcons: { [key: string]: string } = {
            "Clear": "#90caf9",
            "Rain": "#cfd8dc",
            "Snow": "#eceff1",
            "Thunderstorm": "#607d8b",
            "Haze": "#cfd8dc",
            "Clouds": "#b0bec5"
        }
        return weatherIcons[weather] || "";
    }

    function getIcon(weather: string) {
        const weatherIcons: { [key: string]: string } = {
            "Clear": "/icons8-sun-100.png",
            "Rain": "/icons8-rain-100.png",
            "Snow": "/icons8-snow-100.png",
            "Thunderstorm": "/icons8-storm-100.png",
            "Haze": "/icons8-haze-100.png",
            "Clouds": "/icons8-partly-cloudy-day-100.png"
        }
        return weatherIcons[weather] || "";
    }

    function findTodo(id: string | undefined) {
        return data?.find((d) => d.id === id)
    }

    const todo = findTodo(Id);

    const navigate = useNavigate()

    if (isLoading) {
        return (
            <Box>
                <img src="/icons8-dots-loading.gif" alt={"*"} style={{marginTop: 300, marginLeft: 150}}></img>
            </Box>
        )
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <Box>
            <Card sx={{maxWidth: 345, ml: 5.5, mt: 9}}>
                <CardMedia
                    sx={{height: 250, backgroundColor: getBackGroundColor(weatherInfo?.weather[0]?.main)}}
                    image={isLoading ? "*" : getIcon(weatherInfo?.weather[0]?.main)}
                    title="weather foto"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Plan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {todo?.plan}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Start time
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dayjs(todo?.startTime).format('ddd, MMM D, YYYY h:mm A')}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" onClick={() => navigate("/todos")}> Plans </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default TodoView;