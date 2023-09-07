import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Box, Typography, Alert, Button, TextField} from "@mui/material";
import {useForm, Controller} from "react-hook-form"


function LoginPage() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorM, setErrorM] = useState<string>("")


    const navigate = useNavigate()


    type LoginInput = {
        username: string,
        password: string
    }


    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginInput>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function handleLogin(data: LoginInput) {
        axios.post("/api/users/login", {username, password},
            {auth: {username: data.username, password: data.password}, headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                if (response.data !== "anonymousUser") {
                    navigate("/")
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setErrorM("invalid credentials")
                    handleClose()
                }
            })
        setUsername("")
        setPassword("")
    }

    function handleClose() {
        setTimeout(() => {
            setErrorM("");
        }, 5000)
    }

    function onSubmit(data: LoginInput) {
        handleLogin(data)
    }

    return (
        <Box>
            <Box sx={{m: 2}}>sign-up</Box>
            {errorM !== "" ? <Alert variant="filled" severity="error" sx={{mr: 1}}>{errorM}</Alert> : null}

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    minHeight: 400, display: "flex",
                    flexDirection: "column", p: 5, m: 2,
                    mt: 20,
                }}>

                <Typography variant="h5" sx={{ml: 12, mb: 10, fontWeight: 900}}> Login </Typography>

                {errors.username &&
                    <Alert variant="filled" severity="error" sx={{mr: 1, mt: 1}}>username is required</Alert>}
                Username:
                <Controller
                    name="username"
                    control={control}
                    rules={{
                        required: "username name is required",
                    }}
                    render={({field}) => (
                        <TextField
                            label="username"
                            type="text"
                            variant="outlined"
                            {...field}
                        />
                    )}
                />
                {errors.password &&
                    <Alert variant="filled" severity="error" sx={{mr: 1, mt: 1}}>password is required</Alert>}
                Password:
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "password is required",
                    }}
                    render={({field}) => (
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...field}
                        />
                    )}
                />
                <Button variant="contained" type="submit" sx={{mt: 1, width: 100, ml: 7}}>login</Button>
            </Box>
        </Box>
    );
}

export default LoginPage;

