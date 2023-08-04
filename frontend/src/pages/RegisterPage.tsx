import {Box, Button, Paper, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {useRegisterMutation} from "../features/api/apiSlice.tsx";

function RegisterPage() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [register, {isError, isSuccess, data}] = useRegisterMutation()
    const [message, setMessage] = useState<string>("")

    async function handleRegisterNewUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (password === repeatPassword) await register({username, email, password})
        if (isError) return
        if (isSuccess && data != undefined) setMessage(data)
        setUsername("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")
    }

    return (
        <Box>
            <div>{message}</div>
            <Box
                sx={{mt: 10}}
                component="form"
                autoComplete="off"
                onSubmit={handleRegisterNewUser}
            >
                <Paper sx={{
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    m: 2,
                    p: 3
                }}>
                    <TextField onChange={(e) => setUsername(e.target.value)} sx={{mb: 2}} label="username"
                               variant="outlined"/>
                    <TextField onChange={(e) => setEmail(e.target.value)} sx={{mb: 2}} label="email"
                               variant="outlined"/>
                    <TextField onChange={(e) => setPassword(e.target.value)} sx={{mb: 2}} label="password"
                               type="password" variant="outlined"/>
                    <TextField onChange={(e) => setRepeatPassword(e.target.value)} sx={{mb: 2}} label="repeat password"
                               type="password" variant="outlined"/>
                    <Button variant="contained" type="submit" sx={{width: 100, ml: 13}}>Register</Button>
                </Paper>
            </Box>
        </Box>
    );
}

export default RegisterPage;