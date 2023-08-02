import {Box, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {Item} from "../utils.tsx";

function TimedOut() {
    const {timedOuts} = useSelector((state: RootState) => state.timedOut);
    return (
        <Box sx={{m: 2}}>
            {timedOuts.map((t) => (
                <Item key={t.id}>
                    <Typography>{t.id}</Typography>
                    <Typography>{t.plan}</Typography>
                    <Typography>{t.startTime}</Typography>
                    <Typography>{t.createdAt}</Typography>
                </Item>
            ))}


        </Box>
    );
}

export default TimedOut;