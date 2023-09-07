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
    return weatherColors[weather]?.[dayMood] || ""
}

export function calcCelsius(kelvin: number): number {
    return Math.ceil(kelvin - 273.15)
}

export function determineIcon(dayMood: boolean, weather: string) {
    const weatherIcons: { [key: string]: string } = {
        "Clear": dayMood ? "/images/icons8-sun-100.png" : "/images/icons8-moon-100.png",
        "Rain": "/images/icons8-rain-100.png",
        "Snow": dayMood ? "/images/icons8-snow-100.png" : "/images/icons8-snowy-night-100.png",
        "Thunderstorm": dayMood ? "/images/icons8-storm-100.png" : "/images/icons8-stormy-night-100.png",
        "Haze": dayMood ? "/images/icons8-partly-cloudy-day-100.png" : "/images/icons8-night-100.png",
        "Clouds": dayMood ? "/images/icons8-partly-cloudy-day-100.png" : "/images/icons8-night-100.png"
    };

    return weatherIcons[weather] || "";
}

