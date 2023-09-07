import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function Protected() {
    const [currentUser, setCurrentUser] = useState()

    function getCurrentUser() {
        axios.get("/api/users/user")
            .then(response => {
                setCurrentUser(response.data)
            })
            .catch(error => console.log(error.response))
    }

    useEffect(() => {
        getCurrentUser()
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