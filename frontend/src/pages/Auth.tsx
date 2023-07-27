import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";


function Auth() {
    return (
        <Box>
            <Outlet/>
        </Box>
    );
}

export default Auth;