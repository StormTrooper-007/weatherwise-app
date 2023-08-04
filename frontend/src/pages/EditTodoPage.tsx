import {Box, Button, InputLabel, MenuItem, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {MobileDateTimePicker} from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs, {Dayjs} from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {removeId} from "../features/slices/timedOutSlice.ts";
import {useEditTodoMutation} from "../features/api/apiSlice.tsx";
import {useNavigate} from "react-router-dom";
import {RootState} from "../store.tsx";

function EditTodoPage() {
    const [newPlan, setNewPlan] = useState<string>("")
    const [newStatus, setNewStatus] = useState<string>("")
    const [newStartTime, setNewStartTime] = useState<Dayjs | null>(dayjs())
    const [editTodo] = useEditTodoMutation()

    const navigate = useNavigate()
    const {id} = useSelector((state: RootState) => state.timedOut);

    const handleStatusChange = (event: SelectChangeEvent<typeof newStatus>) => {
        const {value} = event.target
        setNewStatus(value as string)
    };

    const dispatch = useDispatch()

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            dispatch(removeId())
            setNewPlan("")
            setNewStatus("")
            setNewStartTime(dayjs())
            event.preventDefault();
            event.returnValue = 'leaving edit page';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch]);

    async function handleUpdateTodo(id: string) {
        await editTodo({
            id,
            plan: newPlan,
            status: newStatus,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            startTime: newStartTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        })
        dispatch(removeId())
        setNewPlan("")
        setNewStatus("")
        setNewStartTime(dayjs())
        navigate("/todos")

    }


    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        }}
             component="form"
             autoComplete="off"
        >
            <Paper elevation={2} sx={{
                m: 2,
                p: 5
            }}>
                <TextField
                    label="what's your plan?"
                    sx={{minWidth: 300, mb: 4}}
                    multiline
                    maxRows={4}
                    variant="standard"
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value)}
                />

                <InputLabel htmlFor="Status">Status</InputLabel>
                <Select
                    autoFocus
                    value={newStatus}
                    onChange={handleStatusChange}
                    label="Status"
                    inputProps={{
                        name: 'Status',
                        id: 'Status'
                    }}
                    sx={{width: 120}}
                >
                    <MenuItem value={0}>Open</MenuItem>
                    <MenuItem value={1}>Doing</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>
                </Select>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={['MobileDateTimePicker']}
                        sx={{mb: 4}}
                    >
                        <DemoItem label="Date">
                            <MobileDateTimePicker value={newStartTime}
                                                  onChange={(newValue) => setNewStartTime(newValue)}/>
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </Paper>
            <Button variant="contained" sx={{ml: 12, width: 200}} onClick={() => handleUpdateTodo(id)}>Update</Button>
        </Box>
    );
}

export default EditTodoPage;