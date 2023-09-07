import {
    Box,
    Grid,
    Paper,
    styled,
    Typography,
    IconButton,
    MenuItem,
    Fade,
    Menu,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useState} from "react";
import {Todo} from "../utils.tsx"
import {useTimer} from "react-timer-hook";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getId, setEditTodo} from "../features/appSlice.ts";


const StyledPaper = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

type props = {
    todo: Todo
    deleteTodo: (id: string) => void
}

function TodoCard({todo, deleteTodo}: props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [unmute, setUnmute] = useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function unMuteAlarm() {
        setUnmute(true)
    }

    const {days, seconds, minutes, hours} = useTimer({
        expiryTimestamp: dayjs(todo.startTime) as never,
        onExpire: () => console.warn("onExpire called"),
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}}>

            <StyledPaper
                sx={{
                    my: 4,
                    mx: 'auto',
                    p: 6,
                }}
            >
                <Paper sx={{mb: 4, p: 1}}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box>{days < 10 ? `${0}${days}` : days} days, {" "}</Box>
                        <Box>{hours < 10 ? `${0}${hours}` : hours}</Box>
                        :
                        <Box> {minutes < 10 ? `${0}${minutes}` : minutes}</Box>
                        :
                        <Box sx={{color: "red"}}>{seconds < 10 ? `${0}${seconds}` : seconds}</Box>
                    </Box>
                </Paper>
                <Grid container wrap="nowrap" spacing={2} sx={{pr: 5, display: "flex", alignItems: "center"}}>
                    <Grid item xs sx={{mb: 2, ml: 2}}>
                        <Typography noWrap>
                            {todo.plan}
                        </Typography>
                    </Grid>
                    <IconButton
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={() => {
                            unMuteAlarm()
                            handleClose()
                        }}>{!unmute ? "Umute Alarm" : "Unmuted"}</MenuItem>
                        <MenuItem onClick={handleClose}>view plan</MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            dispatch(getId(todo.id))
                            dispatch(setEditTodo(todo.plan, todo.startTime))
                            navigate("/todo")
                        }}>edit plan</MenuItem>
                        <MenuItem onClick={() => {
                            deleteTodo(todo.id)
                            handleClose()
                        }
                        }>delete plan</MenuItem>
                    </Menu>
                </Grid>
            </StyledPaper>
        </Box>
    );
}

export default TodoCard;