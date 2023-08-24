import {Item, Todo} from "../utils.tsx";
import {Box, Button, Typography} from "@mui/material";
import {useTimer} from "react-timer-hook";
import dayjs, {Dayjs} from "dayjs";
import {useDeleteTodoMutation} from "../features/api/apiSlice.tsx";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"


type props = {
    todo: Todo
    setEditItem: React.Dispatch<React.SetStateAction<{ plan: string, startTime: Dayjs }>>
    setId: React.Dispatch<React.SetStateAction<string>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    data: Todo[]
}

function TodoCard({todo, setEditItem, setId, setEdit}: props) {

    const [deleteTodo] = useDeleteTodoMutation()

    async function handleDelete(id: string) {
        await deleteTodo(id)
    }


    const {days, seconds, minutes, hours} = useTimer({
        expiryTimestamp: dayjs(todo.startTime) as never,
        onExpire: () => console.warn("onExpire called"),
    });

    const navigate = useNavigate()

    function navigateToEditPage(id: string) {
        setId(id)
        setEdit(prev => !prev)
        navigate("/edit")
    }

    async function handleTimeOutSave() {
        const data = {
            plan: todo.plan,
            startTime: todo.startTime,
            createdAt: todo.createdAt,
            toggleTimer: todo.toggleTimer,
            todoUserId: todo.todoUserId
        }
        await axios.post("/api/timedout", data)
    }

    const handleSave = useCallback(() => {
        handleTimeOutSave()
        deleteTodo(todo.id)

    }, [])


    useEffect(() => {
        const timer = setInterval(() => {
            if (days + hours + minutes + seconds <= 0) {
                handleSave()
                clearInterval(timer)
            }
        }, 1000)
        return () => clearInterval(timer)

    }, [days, hours, minutes, seconds])


    return (
        <Box>
            <Item sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.85)"
            }}>
                <Typography variant="h6" sx={{fontWeight: 900}}>
                    {todo.plan.length > 25 ? (todo.plan.slice(0, 25) + "...") : (todo.plan)}
                </Typography>
                <Typography variant="h6" sx={{fontWeight: 900}}>
                    {days < 10 ? `${0}${days}` : days} days, {" "}
                    {hours < 10 ? `${0}${hours}` : hours}
                    :
                    {minutes < 10 ? `${0}${minutes}` : minutes}
                    :
                    {seconds < 10 ? `${0}${seconds}` : seconds}
                    {days + hours + minutes + seconds === 0 ? " timeup" : " remaining"}
                </Typography>
                <Box>
                    <Button
                        startIcon={<VisibilityIcon/>}
                        variant="outlined" sx={{m: 1}}
                        onClick={() => navigate(`/plan/${todo.id}`)}/>
                    <Button
                        startIcon={<EditIcon/>}
                        sx={{m: 1}}
                        variant="outlined" onClick={() => {
                        navigateToEditPage(todo.id)
                        setEditItem({plan: todo.plan, startTime: dayjs()})
                    }}/>
                    <Button
                        startIcon={<DeleteIcon/>}
                        variant="outlined" sx={{m: 1}} onClick={() => handleDelete(todo.id)}/>
                </Box>
            </Item>
        </Box>
    );
}

export default TodoCard;