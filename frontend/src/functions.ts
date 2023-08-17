export function calcCelsius(kelvin: number): number {
    return Math.ceil(kelvin - 273.15)
}

export function determineMood(weather: string, dayMood: boolean) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const weatherColors: {
        [key: string]: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [key: boolean]: string
        }
    } = {
        "Clear": {true: "#9adcfb", false: "#093170"},
        "Rain": {true: "#b0c4de", false: "#093170"},
        "Mist": {true: "#b0c4de", false: "#093170"},
        "Snow": {true: "#b0c4de", false: "#093170"},
        "Thunderstorm": {true: "#b0c4de", false: "#093170"},
        "Haze": {true: "#b0c4de", false: "#093170"},
        "Clouds": {true: "#9adcfb", false: "#093170"},
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return weatherColors[weather]?.[dayMood] || "";
}

export function determineIcon(dayMood: boolean, weather: string) {
    const weatherIcons: { [key: string]: string } = {
        "Clear": dayMood ? "/icons8-sun-100.png" : "/icons8-moon-100.png",
        "Rain": "/icons8-rain-100.png",
        "Snow": dayMood ? "/icons8-snow-100.png" : "/icons8-snowy-night-100.png",
        "Thunderstorm": dayMood ? "/icons8-storm-100.png" : "/icons8-stormy-night-100.png",
        "Haze": dayMood ? "/icons8-partly-cloudy-day-100.png" : "/icons8-night-100.png",
        "Clouds": dayMood ? "/icons8-partly-cloudy-day-100.png" : "/icons8-night-100.png"
    };

    return weatherIcons[weather] || "";
}