import {Box, Typography, Paper} from "@mui/material"
import {useEffect, useState} from "react"
import {useTime} from "react-timer-hook"


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
    return (
        <Box sx={{
            position: "relative",
            height: 200,
            minWidth: 350,
            backgroundColor: dayMood ? "#9adcfb" : "#093170",
        }}>
            {dayMood ? (
                <img src="/icons8-sun-100.png" alt={"*"}/>
            ) : <img src="/icons8-moon-100.png" alt={"*"}/>}
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

                <Typography variant="h4">{hours}:</Typography>
                <Typography variant="h4">{minutes}:</Typography>
                <Typography variant="h4">{seconds}</Typography>
            </Paper>

        </Box>
    );
}

export default Clock;