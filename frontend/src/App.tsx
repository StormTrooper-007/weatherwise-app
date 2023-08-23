import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import {Box} from "@mui/material"
import Root from "./pages/Root.tsx"
import AddTodo from "./pages/AddTodo.tsx"
import Todos from "./pages/Todos.tsx"
import TimedOut from "./pages/TimedOut.tsx"
import EditTodoPage from "./pages/EditTodoPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import Home from "./pages/Home.tsx"
import {useState} from "react"
import Protected from "./pages/Protected.tsx"
import dayjs, {Dayjs} from "dayjs"
import TodoView from "./pages/TodoView.tsx"


function App() {
    const [editItem, setEditItem] = useState<{ plan: string, startTime: Dayjs }>({plan: "", startTime: dayjs()})
    const [id, setId] = useState<string>("")
    const [edit, setEdit] = useState<boolean>(false)

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<Root/>}>
                    <Route path="/" element={<Protected/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/todo" element={<AddTodo/>}></Route>
                        <Route path="/todos"
                               element={<Todos setEditItem={setEditItem} setEdit={setEdit} setId={setId}/>}></Route>
                        <Route path="/timedout" element={<TimedOut/>}></Route>
                        <Route path="/edit" element={<EditTodoPage setEdit={setEdit} edit={edit} setId={setId} id={id}
                                                                   editItem={editItem}/>}></Route>
                        <Route path="/plan/:Id" element={<TodoView/>}></Route>
                    </Route>
                    <Route path="/register" element={<RegisterPage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                </Route>
            </>
        )
    );
    return (
        <Box>
            <RouterProvider router={router}/>
        </Box>
    )
}

export default App
