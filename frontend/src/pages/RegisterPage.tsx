import {Box, Button, Paper, TextField, Typography, Alert} from "@mui/material"
import {FormEvent, useState} from "react"
import {useRegisterMutation} from "../features/api/apiSlice.tsx"
import {useNavigate} from "react-router-dom"

function RegisterPage() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [register, {isError, isSuccess, data}] = useRegisterMutation()
    const [errorM, setErrorM] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")


    const navigate = useNavigate()

    async function handleRegisterNewUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (password === repeatPassword) await register({username, email, password})
        if (isError) return setErrorM("incorrect input")
        if (isSuccess && data != undefined) {
            setSuccessMessage(data)
            setTimeout(() => {
                navigate("/login")
            }, 3000)
        }
        setUsername("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")

    }


    return (
        <Box>
            {errorM && <Alert severity="error" onClick={() => setErrorM("")}>{errorM}</Alert>}
            {successMessage && <Alert severity="success" onClick={() => setSuccessMessage("")}>{successMessage}</Alert>}
            <Box sx={{mt: 10, ml: 24}}>
                <Typography sx={{fontFamily: 'Rajdhani', fontSize: 20, fontWeight: 'bold'}}>Sign up</Typography>
            </Box>

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
                    <Button variant="contained" type="submit" sx={{width: 100, ml: 13}}>Send</Button>
                </Paper>
            </Box>
        </Box>
    );
}

export default RegisterPage;