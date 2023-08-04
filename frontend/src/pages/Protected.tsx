import {Navigate, Outlet} from "react-router-dom";

type props = {
    currentUser: string
}

function Protected({currentUser}: props) {
    const authenticatedUser = currentUser === "anonymousUser" ? true : false
    return (
        authenticatedUser === false ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default Protected;