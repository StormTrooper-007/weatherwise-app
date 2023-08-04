import {Box, List} from "@mui/material";
import {useGetTodosQuery} from "../features/api/apiSlice.tsx";
import TodoCard from "../components/TodoCard.tsx";



function Todos() {
    const {data, isLoading} = useGetTodosQuery();
    if (isLoading) return (
        <img src="/icons8-dots-loading.gif" alt={"*"} style={{marginTop: 300, marginLeft: 150}}></img>)
    return (
        <Box>
            <List sx={{display: "flex", flexDirection: "column", m: 2}}>
                {
                    data?.map((todo) => (
                        <TodoCard key={todo.id} todo={todo}/>
                    ))
                }
            </List>
        </Box>
    );
}

export default Todos;