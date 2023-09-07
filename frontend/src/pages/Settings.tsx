import {Box, Paper, Switch, Typography} from "@mui/material";
import {toggleMode} from "../features/appSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store.ts";


function Settings() {
    const {colorMode} = useSelector((state: RootState) => state.appState)
    const dispatch = useDispatch()
    return (
        <Box>
            <Paper sx={{height: 100, width: 420, m: 2}}>
                <Typography sx={{m: 1}}> Dark mode </Typography>
                <Switch
                    checked={colorMode}
                    onChange={() => dispatch(toggleMode())}
                />
            </Paper>
        </Box>
    );
}

export default Settings;