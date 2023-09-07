import {Box, Typography} from "@mui/material";
import {Todo} from "../utils.tsx";
import dayjs from "dayjs";


type props = {
    todo: Todo
}


function UpcomingCard({todo}: props) {
    return (
        <Box sx={{
            height: 80,
            width: "100%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            p: 2,
            mt: 2,
            overflow: 'hidden'
        }}>
            <Typography variant={"h6"}> {todo.plan}</Typography>
            <Typography sx={{fontFamily: 'Stick No Bills'}}>
                {dayjs(todo.startTime).format('dddd, MMMM D, YYYY h:mm A')}
            </Typography>
        </Box>
    );
}

export default UpcomingCard;