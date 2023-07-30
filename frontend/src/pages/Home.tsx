import Clock from "../components/Clock.tsx";
import WeatherForecast from "../components/WeatherForecast.tsx";

function Home() {
    return (
        <div>
            <Clock/>
            <WeatherForecast/>
        </div>
    );
}

export default Home;