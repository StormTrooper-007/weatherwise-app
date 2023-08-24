import {Box, List, Typography} from "@mui/material";
import {useGetTodosQuery} from "../features/api/apiSlice.tsx";
import TodoCard from "../components/TodoCard.tsx";
import {blueGrey} from "@mui/material/colors";
import {Dayjs} from "dayjs";

type props = {
    setEditItem: React.Dispatch<React.SetStateAction<{ plan: string, startTime: Dayjs }>>
    setId: React.Dispatch<React.SetStateAction<string>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

function Todos({setEditItem, setId, setEdit}: props) {
    const {data, isLoading} = useGetTodosQuery();
    if (isLoading) return (
        <img src="/icons8-dots-loading.gif" alt={"*"} style={{marginTop: 300, marginLeft: 150}}></img>)
    return (
        <Box>
            <Typography variant="h3" sx={{p: 2, pl: 18, color: "white", backgroundColor: blueGrey[500]}}>
                Plans
            </Typography>
            <Box sx={{backgroundImage: 'url("/rainy.jpg")', minHeight: "100vh", p: 1}}>
                <List sx={{display: "flex", flexDirection: "column", m: 2}}>
                    {
                        data?.map((todo) => (
                            <TodoCard key={todo.id} data={data} todo={todo} setEditItem={setEditItem} setEdit={setEdit}
                                      setId={setId}/>
                        ))
                    }
                </List>
            </Box>
        </Box>
    );
}

export default Todos;