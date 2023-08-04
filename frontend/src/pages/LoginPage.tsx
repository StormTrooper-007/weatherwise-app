import {Box, Button, Paper, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loggedInUser, setLoggedInUser] = useState<string>("");


    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/users/login", {username, password},
            {auth: {username, password}, headers: {'Content-Type': 'application/json'}})
            .then((response) => setLoggedInUser(response.data))
            .catch((error) => console.log(error))
        setUsername("")
        setPassword("")
    }

    function handleLogout() {
        axios.get("api/users/logout")
            .then(response => setMessage(response.data))
            .catch(error => console.log(error))
    }

    const navigate = useNavigate();


    if (logedInUser) {
        navigate("/home")
    }

    return (
        <>
            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleLogin}
            >
                <Paper sx={{
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    m: 2,
                    p: 3
                }}>
                    <TextField sx={{mb: 2}}
                               onChange={(e) => setUsername(e.target.value)}
                               label="username"
                               variant="outlined"
                               value={username}
                    />
                    <TextField sx={{mb: 2}}
                               onChange={(e) => setPassword(e.target.value)}
                               label="password"
                               type="password"
                               value={password}
                               variant="outlined"/>
                    <Button variant="contained" type="submit" sx={{width: 100, ml: 13}}>Login</Button>

                </Paper>
            </Box>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    );
}

export default LoginPage;