import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";


function Protected() {
    const {currentUser} = useSelector((state: RootState) => state.appState)
    return (
        currentUser === "anonymousUser"
            ?
            <Navigate to="/login"/>
            :
            <Outlet/>
    )
}

export default Protected;