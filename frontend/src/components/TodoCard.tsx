import {Item, Todo} from "../utils.tsx";
import {Box, Button, Typography} from "@mui/material";
import {useTimer} from "react-timer-hook";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {saveTimedOut, getId} from "../features/slices/timedOutSlice.ts";
import {useDeleteTodoMutation} from "../features/api/apiSlice.tsx";
import {useNavigate} from "react-router-dom";


type props = {
    todo: Todo
}

function TodoCard({todo}: props) {

    const [deleteTodo] = useDeleteTodoMutation()

    async function handleDelete(id: string) {
        await deleteTodo(id)
    }

    const {days, seconds, minutes, hours} = useTimer({
        expiryTimestamp: dayjs(todo.startTime) as never,
        onExpire: () => console.warn("onExpire called"),
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function navigateToEditPage(id: string) {
        dispatch(getId(id))
        navigate("/edit")
    }

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        setTimeout(() => {
            dispatch(saveTimedOut(todo.id, todo.plan, todo.startTime, todo.status, todo.createdAt))
            deleteTodo(todo.id)
        }, 2000)
    }

    return (
        <Box>
            <Item sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
                <Typography>{todo.plan}</Typography>
                <Typography> {days} days, {hours}:{minutes}:{seconds} remaining</Typography>
                <Box>
                    <Button variant="outlined" sx={{m: 2}}>view</Button>
                    <Button variant="outlined" sx={{m: 2}} onClick={() => navigateToEditPage(todo.id)}>edit</Button>
                    <Button variant="outlined" sx={{m: 2}} onClick={() => handleDelete(todo.id)}>delete</Button>
                </Box>
            </Item>
        </Box>
    );
}

export default TodoCard;