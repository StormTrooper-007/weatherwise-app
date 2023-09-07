import {Alert, Box} from "@mui/material";
import TodoCard from "../components/TodoCard.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {Todo} from "../utils.tsx"

function Todos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [successM, setSuccessM] = useState<string>("")
    const [errorM, setErrorM] = useState<string>("")


    function fetchTodos() {
        axios.get("/api/todos")
            .then(response => {
                setTodos(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error.response))
    }

    function deleteTodo(id: string) {
        axios.delete(`/api/todos/${id}`)
            .then((response) => {
                console.log(response.data)
                fetchTodos()
            })
            .catch((error) => error.response)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", p: 2}}>
                {todos.length === 0 ? <Alert variant="filled" severity="warning">
                    You do not have any pending plans at the moment, check your timed out to see if you missed a plan
                </Alert> : null}
                {errorM !== "" && <Alert variant="filled" severity="error" sx={{mt: 4, mr: 1}}>{errorM}</Alert>}
                {successM !== "" && <Alert variant="filled" severity="success" sx={{mt: 4, mr: 1}}>{successM}</Alert>}
                {todos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        setErrorM={setErrorM}
                        setSuccessM={setSuccessM}
                    />
                ))}
            </Box>
        </>
    );
}

export default Todos;