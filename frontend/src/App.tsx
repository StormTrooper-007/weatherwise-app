import {useEffect, useState} from "react";
import axios from "axios";
import {Todo} from "./utils.tsx";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    async function getAllTodos() {
        const res = await axios.get("/api/todos")
        setTodos(res.data);
    }

    useEffect(() => {
        getAllTodos();
    }, [])

    return (
        <div>
            {todos.map((todo: Todo) => (
                <div>
                    <h2>{todo.plan}</h2>
                    <h2>{todo.createdAt}</h2>
                </div>
            ))}
        </div>
    )
}

export default App
