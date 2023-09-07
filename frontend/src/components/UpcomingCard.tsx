import {Typography, Paper} from "@mui/material";
import {Todo} from "../utils.tsx";
import dayjs from "dayjs";


type props = {
    todo: Todo
}


function UpcomingCard({todo}: props) {
    return (
        <Paper
            elevation={3}
            sx={{
                height: 80,
                width: "100%",
                p: 2,
                mt: 2,
                overflow: 'hidden'
            }}>
            <Typography variant={"h6"}> {todo.plan}</Typography>
            <Typography sx={{fontFamily: 'Stick No Bills'}}>
                {dayjs(todo.startTime).format('dddd, MMMM D, YYYY h:mm A')}
            </Typography>
        </Paper>
    );
}

export default UpcomingCard;

