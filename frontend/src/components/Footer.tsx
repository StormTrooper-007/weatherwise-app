import {Box, Grid, Paper} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateIcon from '@mui/icons-material/Create';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {useNavigate} from "react-router-dom";

function Footer() {

    const navigate = useNavigate()
    return (
        <Box sx={{
            height: 81,
            width: "100%",
            bottom: 1,
            position: "fixed",
            backgroundColor: "#35baf6"
        }}>
            <Grid sx={{flexGrow: 1}} container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item>
                            <Paper onClick={() => navigate("/")}
                                   sx={{p: 2, m: 1, borderRadius: 1}}>
                                <HomeIcon sx={{color: "black"}}/>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper onClick={() => navigate("/todos")}
                                   sx={{p: 2, m: 1, borderRadius: 1}}>
                                <ListAltIcon sx={{color: "black"}}/>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper onClick={() => navigate("/todo")}
                                   sx={{p: 2, m: 1, borderRadius: 1}}>
                                <CreateIcon sx={{color: "black"}}/>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper onClick={() => navigate("/timedout")}
                                   sx={{p: 2, m: 1, borderRadius: 1}}>
                                <AutoDeleteIcon sx={{color: "black"}}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}


export default Footer;