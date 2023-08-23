import {Box, Typography, Button} from "@mui/material"
import {blueGrey} from "@mui/material/colors"
import {Item} from "../utils.tsx";
import {useState, useEffect} from "react"
import {Todo} from "../utils.tsx"
import axios from "axios"
import dayjs from "dayjs"

function TimedOut() {
    const [timedouts, setTimedOuts] = useState<Todo[]>([])

    async function getTimedOuts() {
        const response = await axios.get("/api/timedout")
        setTimedOuts(response.data)
    }

    async function deleteTimedOut(id: string) {
        await axios.delete(`/api/timedout/${id}`)
        await getTimedOuts()
    }

    useEffect(() => {
        getTimedOuts()
    }, [])

    return (
        <Box sx={{
            backgroundImage: 'url("/objects.jpg")',
            height: "100vh",
            backgroundPosition: "center",
            backGroundSize: "cover"
        }}
        >
            <Typography variant="h3" sx={{mb: 2, p: 2, pl: 10, color: "white", backgroundColor: blueGrey[500]}}>Timed
                outs</Typography>
            {timedouts.map((t) => (
                <Item key={t.id}>
                    <Typography
                        sx={{fontWeight: 900}}>Plan: {t.plan.length > 25 ? t.plan.slice(0, 25) + "..." : t.plan}</Typography>
                    <Typography> Start: {dayjs(t.startTime).format('ddd, MMM D, YYYY h:mm A')}</Typography>
                    <Typography> Ends: {dayjs(t.createdAt).format('ddd, MMM D, YYYY h:mm A')}</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{textTransform: "none", mt: 2}} onClick={() => deleteTimedOut(t.id)}>X</Button>
                </Item>
            ))}
        </Box>
    );
}

export default TimedOut;