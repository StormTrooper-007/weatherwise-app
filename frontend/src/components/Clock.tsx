import {Box, Typography, Paper} from "@mui/material"
import {useEffect, useState} from "react"
import {useTime} from "react-timer-hook"
import dayjs from "dayjs";
import {WeatherInfo} from "../utils.tsx";


type props = {
    weatherInfo?: WeatherInfo
}


function Clock({weatherInfo}: props) {
    const [dayMood, setDayMood] = useState(false);
    const {
        seconds,
        minutes,
        hours,
    } = useTime();

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

    function getDayOfTheWeek() {
        const dayInNumber = new Date().getDay()
        switch (dayInNumber) {
            case 0:
                return "Sunday"
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            default:
                return
        }
    }


    function determineMood(weather: string, dayMood: boolean) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        const weatherColors: {
            [key: string]: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                [key: boolean]: string
            }
        } = {
            "Clear": {true: "#9adcfb", false: "#093170"},
            "Rain": {true: "#b0c4de", false: "#093170"},
            "Mist": {true: "#b0c4de", false: "#093170"},
            "Snow": {true: "#b0c4de", false: "#093170"},
            "Thunderstorm": {true: "#b0c4de", false: "#093170"},
            "Haze": {true: "#b0c4de", false: "#093170"},
            "Clouds": {true: "#9adcfb", false: "#093170"},
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return weatherColors[weather]?.[dayMood] || "";
    }

    const weather = weatherInfo?.weather.find((info: { id: number, main: string, description: string }) => info.main)


    function determineIcon(dayMood: boolean, weather: string) {
        const weatherIcons: { [key: string]: string } = {
            "Clear": dayMood ? "/icons8-sun-100.png" : "/icons8-moon-100.png",
            "Rain": "/icons8-rain-100.png",
            "Snow": dayMood ? "/icons8-snow-100.png" : "/icons8-snowy-night-100.png",
            "Thunderstorm": dayMood ? "/icons8-storm-100.png" : "/icons8-stormy-night-100.png",
            "Haze": dayMood ? "/icons8-partly-cloudy-day-100.png" : "/icons8-night-100.png",
            "Clouds": dayMood ? "/icons8-partly-cloudy-day-100.png" : "/icons8-night-100.png"
        };

        return weatherIcons[weather] || "";
    }

    return (
        <Box sx={{
            position: "relative",
            height: 250,
            minWidth: "100%",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            backgroundColor: determineMood(weather?.main, dayMood)
        }}>
            {// eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <img src={determineIcon(dayMood, weather?.main)} alt={"*"}/>
            }
            <Paper
                sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.24)",
                    p: 3,
                    top: 50,
                    left: 110
                }}>
                <Typography variant="h6">{getDayOfTheWeek()}{"  , "}</Typography>
                <Typography variant="h4">{hours < 10 && 0}{hours}:</Typography>
                <Typography variant="h4">{minutes < 10 && 0}{minutes}:</Typography>
                <Typography variant="h4">{seconds < 10 && 0}{seconds}</Typography>
            </Paper>
            <Typography>{dayjs().format('DD/MM/YYYY')}</Typography>
        </Box>
    );
}

export default Clock;