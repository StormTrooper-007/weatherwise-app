import {Item, Todo} from "../utils.tsx";
import {Box, Button, Typography} from "@mui/material";

type props = {
    todo: Todo
}

function TodoCard({todo}: props) {
    return (
        <Box>
            <Item sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
                <Typography>{todo.plan}</Typography>
                <Typography>created days ago</Typography>
                <Box>
                    <Button variant="contained" sx={{m: 2}}>view</Button>
                    <Button variant="contained" sx={{m: 2}}>edit</Button>
                    <Button variant="contained" sx={{m: 2}}>delete</Button>
                </Box>
            </Item>
        </Box>
    );
}

export default TodoCard;