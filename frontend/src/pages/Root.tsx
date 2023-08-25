import {Box, Grid} from "@mui/material"
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer.tsx"

function Root() {
    return (
        <Box sx={{position: "relative"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Outlet/>
                </Grid>
                <Grid item xs={12}>
                    <Footer/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Root;