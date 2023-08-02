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
            height: 81,
            bottom: 1,
            position: "fixed",
            m: 0.25

        }}>
            <Button variant="contained" sx={{pt: 2, pb: 2}}
                    startIcon={<HomeIcon sx={{height: 30, width: 30, ml: 2}}/>}/>
            <Button variant="contained" sx={{pt: 2, pb: 2}}
                    startIcon={<ListAltIcon sx={{height: 30, width: 30, ml: 2}}/>}/>
            <Button variant="contained" sx={{pt: 2, pb: 2}}
                    startIcon={<GradeIcon sx={{height: 30, width: 30, ml: 2}}/>}/>
            <Button variant="contained" sx={{pt: 2, pb: 2}}
                    startIcon={<AutoDeleteIcon sx={{height: 30, width: 30, ml: 2}}/>}/>
            <Button variant="contained" sx={{pt: 2, pb: 2}}
                    startIcon={<SettingsIcon sx={{height: 30, width: 30, ml: 2}}/>}/>
            <Button variant="contained" sx={{pt: 2, pb: 2}}
                    startIcon={<PersonIcon sx={{height: 30, width: 30, ml: 2}}/>}/>
        </Box>
    );
}


export default Footer;