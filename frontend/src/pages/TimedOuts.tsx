import {Alert, Box} from "@mui/material";
import {Todo} from "../utils.tsx";
import {useEffect, useState} from "react";
import TimedOut from "../components/TimedOut.tsx";
import axios from "axios";


function TimedOuts() {
    const [timedouts, setTimedOuts] = useState<Todo[]>([])
    const [successM, setSuccessM] = useState<string>("")
    const [errorM, setErrorM] = useState<string>("")

    function fetchTimedOuts() {
        axios.get("/api/timedout")
            .then(response => {
                    setTimedOuts(response.data)
                    console.log(response.data)
                }
            )
            .catch(error => error.response.data)
    }

    function deleteTimedOut(id: string) {
        axios.delete(`/api/timedout/${id}`)
            .then(response => {
                setSuccessM(`${response.data}  : timed out deleted successfully`)
                fetchTimedOuts()
                setTimeout(() => {
                    setSuccessM("")
                }, 3000)
            })
            .catch(error => {
                setErrorM(`${error.response.data} : could not delete timedout`)
                setTimeout(() => {
                    setErrorM("")
                }, 3000)
            })
    }

    useEffect(() => {
        fetchTimedOuts()
    })

    return (
        <Box sx={{m: 3}}>
            {timedouts.length === 0 ? <Alert variant="filled" severity="warning">
                You dont have any timeouts at the moment, go create a new plan
            </Alert> : null}
            {errorM !== "" && <Alert variant="filled" severity="error">{errorM}</Alert>}
            {successM !== "" && <Alert variant="filled" severity="success">{successM}</Alert>}
            {timedouts.map((to) => (
                <TimedOut key={to.id} to={to} deleteTimedOut={deleteTimedOut}/>
            ))}
        </Box>
    );
}

export default TimedOuts;