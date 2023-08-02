import Clock from "../components/Clock.tsx";
import {useGetUpcomingQuery} from "../features/api/apiSlice.tsx";
import {Box, Grid, Typography} from "@mui/material";
import UpcomingTodoCard from "../components/UpcomingTodoCard.tsx";


function Home() {
    const {data, isLoading} = useGetUpcomingQuery();

    if (isLoading) {
        return (<img src="/icons8-dots-loading.gif" alt={"*"} style={{marginTop: 300, marginLeft: 150}}></img>)
    }

    return (
        <Box sx={{flexGrow: 1, height: "100vh"}}>
            <Grid container>
                <Grid item xs={12}>
                    <Clock/>
                </Grid>
                <Grid item xs={12} sx={{backgroundColor: "#708090"}}>
                    <Typography variant="h3">Upcoming</Typography>
                    {data?.map((upcoming) => (
                        <Box key={upcoming.id}
                             sx={{
                                 display: "flex",
                                 justifyContent: "space-between",
                             }}
                        >
                            <UpcomingTodoCard upcoming={upcoming}/>
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{height: 100}}>Footer</Box>
                </Grid>
            </Grid>
        </Box>

    );
}

export default Home;