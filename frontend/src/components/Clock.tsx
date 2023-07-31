import {Box, Typography, Paper} from "@mui/material"
import {useEffect, useState} from "react"
import {useTime} from "react-timer-hook"
import dayjs from "dayjs";


function Clock() {
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

        // Call the update function initially and every minute
        updateBackgroundColor();
        const interval = setInterval(updateBackgroundColor, 60000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [hours]);

    function getDayOfTheWeek() {
        const dayInNumber = new Date().getDay()
        switch (dayInNumber) {
            case 0:
                return "Sunday"
                break;
            case 1:
                return "Monday"
                break;
            case 2:
                return "Tuesday"
                break;
            case 3:
                return "Wednesday"
                break;
            case 4:
                return "Thursday"
                break;
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
                break;
            default:
                break;
        }
    }


    function determineMood(weather: string) {
        let result = ""
        if (weather === "Clear" && dayMood) {
            result = "#9adcfb"
        } else if (weather === "Rain" && dayMood) {
            result = "#b0c4de"
        } else if (weather === "Mist" && dayMood) {
            result = "#b0c4de"
        } else if (weather === "Snow" && dayMood) {
            result = "#b0c4de"
        } else if (weather === "Thunderstorm" && dayMood) {
            result = "#b0c4de"
        } else if (weather === "Haze" && dayMood) {
            result = "#b0c4de"
        } else if (weather === "Clouds" && dayMood) {
            result = "#9adcfb"
        } else if (weather === "Clear" && !dayMood) {
            result = "#093170"
        } else if (weather === "Rain" && !dayMood) {
            result = "#093170"
        } else if (weather === "Snow" && !dayMood) {
            result = "#093170"
        } else if (weather === "Thunderstorm" && !dayMood) {
            result = "#093170"
        } else if (weather === "Clouds" && !dayMood) {
            result = "#093170"
        } else if (weather === "Mist" && !dayMood) {
            result = "#093170"
        } else if (weather === "Haze" && !dayMood) {
            result = "#093170"
        } else {
            result = ""
        }
        return result
    }

    function determineIcon() {
        let result = ""
        if ("Clouds" && !dayMood) {
            result = "/icons8-night-100.png"
        } else if ("Clouds" && dayMood) {
            result = "/icons8-night-100.png"
        }
        return result
    }

    return (
        <Box sx={{
            position: "relative",
            height: 250,
            minWidth: "100%",
            backgroundColor: determineMood("Haze")
        }}>
            {dayMood ? (
                <img src="/icons8-sun-100.png" alt={"*"}/>
            ) : <img src={determineIcon()} alt={"*"}/>}
            <Paper
                sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
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