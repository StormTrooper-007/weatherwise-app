import {Item, Todo} from "../utils.tsx";
import {Box, Button, Typography} from "@mui/material";
import {useTimer} from "react-timer-hook";
import dayjs from "dayjs";

type props = {
    todo: Todo
}

function TodoCard({todo}: props) {
    const {days, seconds, minutes, hours} = useTimer({
        expiryTimestamp: dayjs(todo.startTime) as never,
        onExpire: () => console.warn("onExpire called"),
    });

    return (
        <Box>
            <Item sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
                <Typography>{todo.plan}</Typography>
                <Typography> {days} days, {hours}:{minutes}:{seconds} remaining</Typography>
                <Box>
                    <Button variant="outlined" sx={{m: 2}}>view</Button>
                    <Button variant="outlined" sx={{m: 2}}>edit</Button>
                    <Button variant="outlined" sx={{m: 2}}>delete</Button>
                </Box>
            </Item>
        </Box>
    );
}

export default TodoCard;