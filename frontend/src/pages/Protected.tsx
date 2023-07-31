import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.tsx";

function Protected() {
    return (
        <Box>
            <Outlet/>
            <Footer/>
        </Box>
    );
}

export default Protected;