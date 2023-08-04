import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Box} from "@mui/material";
import Root from "./pages/Root.tsx";
import AddTodo from "./pages/AddTodo.tsx";
import Todos from "./pages/Todos.tsx";
import TimedOut from "./pages/TimedOut.tsx";
import EditTodoPage from "./pages/EditTodoPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Home from "./pages/Home.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import Protected from "./pages/Protected.tsx"


function App() {
    const [currentUser, setCurrentUser] = useState<string>("");

    function getCurrentUser() {
        axios.get("api/users/user")
            .then(response => setCurrentUser(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    if (currentUser) console.log(currentUser)

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<Root/>}>
                    <Route path={"/"} element={<Protected/>}>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path="/todo" element={<AddTodo/>}></Route>
                        <Route path="/todos" element={<Todos/>}></Route>
                        <Route path="/timedout" element={<TimedOut/>}></Route>
                        <Route path="/edit" element={<EditTodoPage/>}></Route>
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
