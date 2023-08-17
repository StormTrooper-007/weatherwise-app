import {Paper, styled} from "@mui/material";


export type Todo = {
    id: string
    plan: string
    startTime: string
    toggleTimer: boolean
    createdAt: string
    todoUserId: string
}

export type WeatherInfo = {
    coord: {
        lat: number
        long: number
    }
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
    }
    weather: {
        id: number
        main: string
        description: string
    }[]
    clouds: {
        all: number
    }
    name: string
}

export const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    margin: 4
}));