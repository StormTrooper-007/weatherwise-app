import {Box, List} from "@mui/material";
import {useGetTodosQuery} from "../features/api/apiSlice.tsx";
import TodoCard from "../components/TodoCard.tsx";
import {useState} from "react";


function Todos() {
    const [showError, setShowError] = useState("");
    const {data, error, isLoading, isError} = useGetTodosQuery();
    if (isLoading) {
        return (<img src="/icons8-dots-loading.gif" alt={"*"} style={{marginTop: 300, marginLeft: 150}}></img>)
    } else if (error) {
        setShowError(isError.toString())
    } else {
        return (
            <Box>
                {<div>{showError}</div>}
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
}

export default Todos;