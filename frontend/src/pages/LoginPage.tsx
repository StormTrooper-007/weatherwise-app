import {Button, Paper, TextField, Typography, Box, Alert} from "@mui/material";
import {FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {toggleLoginStatus, getCurrentUser} from "../features/slices/appSlice.ts";

function LoginPage() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const {loginStatus} = useSelector((state: RootState) => state.appState)
    const [errorM, setErrorM] = useState<string>("")

    const dispatch = useDispatch()
    const navigate = useNavigate()


    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/users/login", {username, password},
            {auth: {username, password}, headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                if (response.data !== null) {
                    dispatch(toggleLoginStatus())
                    dispatch(getCurrentUser(response.data))
                    if (!loginStatus) navigate("/")
                }
            })
            .catch((error) => setErrorM("wrong credentials"))
        setUsername("")
        setPassword("")
    }


    return (
        <Box>
            {errorM !== "" && <Alert severity="error">{errorM}</Alert>}
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{mt: 10, ml: 2}}>
                    <img src="/icons8-partly-cloudy-day.gif" alt="*" style={{marginLeft: 150}}/>
                    <Typography variant="h4" sx={{fontFamily: 'Rajdhani', fontSize: 18, fontWeight: 'bold'}}>
                        plan your day better with weatherwise
                    </Typography>
                </Box>
                <Box sx={{height: 30, p: 1, pb: 5}}>
                    <Typography onClick={() => navigate("/register")}
                                sx={{fontFamily: 'Rajdhani', fontWeight: 'bold', fontSize: 20}}
                    >sign-up</Typography>
                </Box>
            </Box>
            <Box sx={{mt: 10, ml: 25}}>
                <Typography sx={{fontFamily: 'Rajdhani', fontWeight: 'bold', fontSize: 20}}>Login</Typography>
            </Box>


            <form
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
            </form>
        </Box>
    );
}

export default LoginPage;