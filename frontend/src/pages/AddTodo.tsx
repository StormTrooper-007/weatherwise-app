import {Box, Button, Paper, TextField, Alert} from "@mui/material";
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import {useCreateTodoMutation} from "../features/api/apiSlice.tsx";
import {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTodoMessage} from "../features/slices/appSlice.ts";
import {RootState} from "../store.tsx";


function AddTodo() {
    const [plan, setPlan] = useState<string>("");
    const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
    const [createTodo, {isError, isSuccess, error}] = useCreateTodoMutation();

    const dispatch = useDispatch()
    const {todoMessage} = useSelector((state: RootState) => state.appState)

    async function handleCreateTodo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await createTodo({plan, startTime: startTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ")})
        setPlan("")
        setStartTime(dayjs())
        if (isSuccess) {
            dispatch(getTodoMessage("new plan created successfully", ""))
        }
        if (isError) {
            console.log(error.data.error)
            dispatch(getTodoMessage("", "error creating new plan, invalid input!"))
        }
    }

    return (
        <Box
            onSubmit={handleCreateTodo}
            sx={{
                height: "100vh",
                backgroundImage: 'url("/hobby.jpg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                p: 2
            }}

            component="form"
            autoComplete="off"
        >
            {isSuccess && <Alert severity="success">{todoMessage.success}</Alert>}
            {isError && <Alert severity="error">{todoMessage.error}</Alert>}
            <Paper sx={{m: 5, p: 5}}>
                <TextField
                    label="what's your plan?"
                    multiline
                    maxRows={4}
                    variant="standard"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    sx={{minWidth: 200}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={['MobileDateTimePicker']}
                    >
                        <DemoItem label="Date">
                            <MobileDateTimePicker value={startTime} onChange={(newValue) => setStartTime(newValue)}/>
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                <Button type="submit" variant="contained" sx={{m: 2}}>submit</Button>
            </Paper>
        </Box>
    );
}

export default AddTodo;