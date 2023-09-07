import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios"
import {LocalizationProvider, MobileDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {removeEditTodo, removeId} from "../features/appSlice.ts";


function CreateTodo() {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {id, todoEdit} = useSelector((state: RootState) => state.appState)
    const [plan, setPlan] = useState<string>(editMode ? "" : todoEdit.plan)
    const [startTime, setStartTime] = useState<Dayjs | null>(
        dayjs(editMode ? dayjs() : todoEdit.startTime)
    )
    const [errorM, setErrorM] = useState<string>("")
    const [successM, setSuccessM] = useState<string>("")

    const dispatch = useDispatch()


    function errorMClose() {
        setTimeout(() => {
            setErrorM("")
        }, 3000)
    }

    function successMClose() {
        setTimeout(() => {
            setSuccessM("")
        }, 3000)
    }

    function createNewTodo(e: FormEvent) {
        e.preventDefault()
        axios.post("/api/todos", {plan, startTime: startTime?.format("YYYY-MM-DDTHH:mm:ss.SSSZ")})
            .then((response) => {
                setSuccessM(response.data)
                successMClose()
            })
            .catch(error => {
                setErrorM(error.response.data.errors[0].defaultMessage)
                errorMClose()
            })
    }

    function updateTodo(e: FormEvent) {
        e.preventDefault()
        axios.put(`/api/todos/${id}`, {plan, startTime})
            .then(response => {
                dispatch(removeId())
                dispatch(removeEditTodo())
                setSuccessM(`plan with id ${response.data.id} has been updated successfully`)
                successMClose()
                dispatch(removeId())
                dispatch(removeEditTodo())
            })
            .catch(error => {
                setErrorM(error.response.data)
                errorMClose()
            })
    }

    useEffect(() => {
        if (id !== "") {
            setEditMode(true)
        }
    }, [])


    return (
        <>
            {errorM !== "" && <Alert variant="filled" severity="error" sx={{mt: 4, mr: 1}}>{errorM}</Alert>}
            {successM !== "" && <Alert variant="filled" severity="success" sx={{mt: 4, mr: 1}}>{successM}</Alert>}
            <Box onSubmit={!editMode ? createNewTodo : updateTodo}
                 sx={{mt: 10, ml: 3, p: 3, minHeight: 50, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", width: 300}}
                 component="form">

                <Typography sx={{mb: 2}}>Create a new plan: </Typography>
                <TextField
                    sx={{width: 250}}
                    label="what's your plan"
                    multiline
                    rows={4}
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                />
                <Box sx={{mt: 5}}>
                    <Typography sx={{mb: 2}}> Enter Start Date: </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker defaultValue={dayjs()} onChange={(newValue) => setStartTime(newValue)}/>
                    </LocalizationProvider>
                </Box>
                <Button variant="contained" type="submit" sx={{mt: 5}}>{!editMode ? "Create" : "Update"}</Button>
            </Box>
        </>
    );
}

export default CreateTodo;