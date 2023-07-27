import {Box, Button, Paper, TextField} from "@mui/material";
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import {useCreateTodoMutation} from "../features/api/apiSlice.tsx";
import {FormEvent, useState} from "react";


function AddTodo() {
    const [plan, setPlan] = useState<string>("");
    const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
    const [createTodo] = useCreateTodoMutation();

    async function handleCreateTodo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await createTodo({plan, startTime: startTime.format()})
        setPlan("")
        setStartTime(dayjs())
    }


    return (
        <Box
            onSubmit={handleCreateTodo}
            style={{
                border: "1px solid black",
                height: "100vh"
            }}
            component="form"
            autoComplete="off"
        >
            <Paper sx={{m: 5, p: 5}}>
                <TextField
                    label="what's your plan?"
                    multiline
                    maxRows={4}
                    variant="standard"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
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