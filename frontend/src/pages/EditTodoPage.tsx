import {Box, Button, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {MobileDateTimePicker} from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs, {Dayjs} from "dayjs";
import {useEditTodoMutation} from "../features/api/apiSlice.tsx";
import {useNavigate} from "react-router-dom";


type props = {
    editItem: { plan: string, startTime: Dayjs }
    setId: React.Dispatch<React.SetStateAction<string>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    id: string
}

function EditTodoPage({editItem, setId, id, setEdit}: props) {
    const [newPlan, setNewPlan] = useState<string>(editItem.plan)
    const [newStartTime, setNewStartTime] = useState<Dayjs | null>(editItem.startTime)
    const [editTodo] = useEditTodoMutation()

    const navigate = useNavigate()

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            setId("")
            setEdit(prev => !prev)
            setNewPlan("")
            setNewStartTime(dayjs())
            event.preventDefault();
            event.returnValue = 'leaving edit page';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [setId, setEdit]);

    async function handleUpdateTodo(id: string) {
        await editTodo({
            id,
            plan: newPlan,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            startTime: newStartTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        })
        setId("")
        setEdit(prev => !prev)
        setNewPlan("")
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