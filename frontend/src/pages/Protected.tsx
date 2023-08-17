import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function Protected() {
    const [currentUser, setCurrentUser] = useState<string>("");


    function getUser() {
        axios.get("api/users/user")
            .then(response => setCurrentUser(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        currentUser === "anonymousUser"
            ?
            <Navigate to="/login"/>
            :
            <Outlet/>
    )
}

export default Protected;