export type Todo = {
    id: string
    plan: string
    startTime: string
    createdAt: string
    todoUserId: string
}


export type WeatherInfo = {
    coord: {
        lat: number,
        long: number,
    },
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
    },
    weather: { id: number, main: string, description: string }[],
    clouds: {
        all: number
    },
    name: string
}
