import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Box} from "@mui/material";
import Protected from "./pages/Protected.tsx";
import AddTodo from "./pages/AddTodo.tsx";
import Todos from "./pages/Todos.tsx";
import Home from "./pages/Home.tsx";


function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Protected/>}>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/todo" element={<AddTodo/>}></Route>
                    <Route path="/todos" element={<Todos/>}></Route>
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
