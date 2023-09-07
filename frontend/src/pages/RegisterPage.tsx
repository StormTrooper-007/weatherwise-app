import {Box, Button, Paper, TextField, Typography, Alert} from "@mui/material"
import {FormEvent, useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";

function RegisterPage() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [errorM, setErrorM] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errors, setErrors] = useState<any[]>([]);


    const navigate = useNavigate()

    function closeErrorMessage() {
        setTimeout(() => {
            setErrorM("")
        }, 3000)
    }

    function closeSuccessMessage() {
        setTimeout(() => {
            setSuccessMessage("")
        }, 3000)
    }

    function navigateToLogin() {
        setTimeout(() => {
            navigate("/login")
        }, 3000)
    }

    function registerNewUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (password === repeatPassword) {
            axios.post("/api/users/register", {username, email, password})
                .then(response => {
                    setSuccessMessage(response.data)
                    closeSuccessMessage()
                    navigateToLogin()
                })
                .catch(error => {
                    setErrorM(error.response.data.error)
                    setErrors(error.response.data.errors)
                    closeErrorMessage()
                })
        }
        setUsername("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")
    }

    return (
        <Box>
            {errorM !== "" && <Alert variant="filled" severity="error" sx={{mt: 2, mr: 2}}>{errorM}</Alert>}
            {successMessage !== "" && <Alert variant="filled" severity="success">{successMessage}</Alert>}
            <Box sx={{mt: 10, ml: 17}}>
                <Typography sx={{fontFamily: 'Rajdhani', fontSize: 20, fontWeight: 'bold'}}>Sign up</Typography>
            </Box>

            <Box
                sx={{mt: 10}}
                component="form"
                autoComplete="off"
                onSubmit={registerNewUser}
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
                    <Button variant="contained" type="submit" sx={{width: 100, ml: 12}}>Sign-up</Button>
                </Paper>
            </Box>
            <Paper elevation={1}>
                {errors.map((error, index) => (
                    <div key={index} style={{color: "red"}}>{error.defaultMessage}</div>
                ))}
            </Paper>

        </Box>
    );
}

export default RegisterPage;