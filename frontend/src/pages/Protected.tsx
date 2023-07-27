import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";

function Protected() {
    return (
        <Box>
            <Outlet/>
        </Box>
    );
}

export default Protected;