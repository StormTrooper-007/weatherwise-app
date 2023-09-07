import {Box, Paper, Switch} from "@mui/material";
import {toggleMode} from "../features/appSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store.ts";


function Settings() {
    const {colorMode} = useSelector((state: RootState) => state.appState)
    const dispatch = useDispatch()
    return (
        <Box>
            <Box>
                <Switch
                    checked={colorMode}
                    onChange={() => dispatch(toggleMode())}
                />
            </Box>
            <Paper sx={{height: 100, width: 100}}>

            </Paper>
        </Box>
    );
}

export default Settings;