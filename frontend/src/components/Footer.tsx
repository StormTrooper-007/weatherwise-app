import {Box} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GradeIcon from '@mui/icons-material/Grade';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import SettingsIcon from '@mui/icons-material/Settings';

function Footer() {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "spaced-evenly",
            height: 81,
            width: "100%",
            bottom: 1,
            p: 1,
            position: "fixed",
            backgroundColor: "#35baf6"
        }}>
            <Box sx={{border: "1px solid white", p: 2, m: 1, borderRadius: 1}}>
                <HomeIcon sx={{color: "white"}}/>
            </Box>
            <Box sx={{border: "1px solid white", p: 2, m: 1, borderRadius: 1}}>
                <ListAltIcon sx={{color: "white"}}/>
            </Box>
            <Box sx={{border: "1px solid white", p: 2, m: 1, borderRadius: 1}}>
                <GradeIcon sx={{color: "white"}}/>
            </Box>
            <Box sx={{border: "1px solid white", p: 2, m: 1, borderRadius: 1}}>
                <AutoDeleteIcon sx={{color: "white"}}/>
            </Box>
            <Box sx={{border: "1px solid white", p: 2, m: 1, borderRadius: 1}}>
                <SettingsIcon sx={{color: "white"}}/>
            </Box>

        </Box>
    );
}


export default Footer;