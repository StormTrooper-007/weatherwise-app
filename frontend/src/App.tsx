import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Protected from "./pages/Protected.tsx";
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import CreateTodo from "./pages/CreateTodo.tsx";
import Root from "./pages/Root.tsx";
import Settings from "./pages/Settings.tsx";
import Todos from "./pages/Todos.tsx";


function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<Root/>}>
                    <Route element={<Protected/>}>
                        <Route path="/todo" element={<CreateTodo/>}></Route>
                        <Route path="/settings" element={<Settings/>}></Route>
                        <Route path="/todos" element={<Todos/>}></Route>
                    </Route>

                    <Route>
                        <Route index element={<Home/>}></Route>
                        <Route path="/login" element={<LoginPage/>}></Route>
                        <Route path="/register" element={<RegisterPage/>}></Route>
                    </Route>
                </Route>

            </>
        )
    )
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App
