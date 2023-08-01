import {Box, Button} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GradeIcon from '@mui/icons-material/Grade';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';


function Footer() {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "spaced-evenly",
            height: 81

        }}>
            <Button variant="outlined" sx={{p: 3}} startIcon={<HomeIcon sx={{height: 30, width: 30, ml: 1}}/>}/>
            <Button variant="outlined" sx={{p: 3}} startIcon={<ListAltIcon sx={{height: 30, width: 30, ml: 1}}/>}/>
            <Button variant="outlined" sx={{p: 3}} startIcon={<GradeIcon sx={{height: 30, width: 30, ml: 2}}/>}/>
            <Button variant="outlined" sx={{p: 3}} startIcon={<AutoDeleteIcon sx={{height: 30, width: 30, ml: 1}}/>}/>
            <Button variant="outlined" sx={{p: 3}} startIcon={<SettingsIcon sx={{height: 30, width: 30, ml: 1}}/>}/>
            <Button variant="outlined" sx={{p: 3}} startIcon={<PersonIcon sx={{height: 30, width: 30, ml: 1}}/>}/>
        </Box>
    );
}


export default Footer;