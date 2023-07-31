import {Todo} from "../utils.tsx";
import {Box, Typography} from "@mui/material";
import dayjs from "dayjs";


type props = {
    upcoming: Todo
}

function UpcomingTodoCard({upcoming}: props) {

    return (
        <Box sx={{
            backgroundColor: "rgba(200, 200, 200, 0.2)",
            border: "1px solid white",
            p: 4, width: "100%",
            borderRadius: 10,
            m: 2
        }}>
            <Typography>{upcoming?.plan}</Typography>
            <Typography>{dayjs(upcoming?.startTime).format("MMMM D, YYYY h:mm A")}</Typography>
        </Box>
    );
}

export default UpcomingTodoCard;