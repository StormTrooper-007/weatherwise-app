import {Box, Button, Divider, Typography} from "@mui/material";
import {Todo} from "../utils.tsx";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';

type props = {
    to: Todo
    deleteTimedOut: (id: string) => void
}

function TimedOut({to, deleteTimedOut}: props) {

    return (
        <Box
            sx={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                minHeight: 80, width: "100%", p: 3,
                display: "flex", flexDirection: "column"
            }}>
            <Typography sx={{textAlign: "left"}}>{to.plan}</Typography>
            <Divider/>
            <Typography sx={{textAlign: "left"}}>{dayjs(to.startTime).format('dddd, MMMM D, YYYY h:mm A')}</Typography>
            <Button
                onClick={() => deleteTimedOut(to.id)}
                color="error" variant="contained"
                sx={{width: 50, mt: 2}}
                startIcon={<DeleteIcon sx={{ml: 1}}/>}>
            </Button>
        </Box>
    );
}

export default TimedOut;