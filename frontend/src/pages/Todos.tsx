import {Box} from "@mui/material";
import TodoCard from "../components/TodoCard.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {Todo} from "../utils.tsx"

function Todos() {
    const [todos, setTodos] = useState<Todo[]>([])

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
                {todos.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} deleteTodo={deleteTodo}/>
                ))}
            </Box>
        </>
    );
}

export default Todos;