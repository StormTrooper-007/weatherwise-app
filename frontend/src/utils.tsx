import {Paper, styled} from "@mui/material";

export type Todo = {
    id: string
    plan: string
    startTime: string
    status: string;
    createdAt: string;
}


export const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: 4,
}));