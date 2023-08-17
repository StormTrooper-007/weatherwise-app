import {Todo} from "../utils.tsx";
import {Box, Typography} from "@mui/material";
import dayjs from "dayjs";


type props = {
    upcoming: Todo
}

function UpcomingTodoCard({upcoming}: props) {
    return (
        <Box sx={{
            backgroundColor: "rgba(255, 255, 255, 0.80)",
            p: 4, width: "100%",
            borderRadius: 5,
            border: '1px solid "rgba(209, 213, 219, 0.3)"',
            m: 2
        }}>
            <Typography
                sx={{fontWeight: 900}}>Plan:{upcoming?.plan.length > 25 ? upcoming.plan.slice(0, 25) : upcoming.plan}</Typography>
            <Typography
                sx={{fontWeight: 900}}>Starting: {dayjs(upcoming?.startTime).format('ddd, MMM D, YYYY h:mm A')}</Typography>
        </Box>
    );
}

export default UpcomingTodoCard;