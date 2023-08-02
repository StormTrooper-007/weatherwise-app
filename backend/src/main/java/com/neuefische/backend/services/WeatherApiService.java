package com.neuefische.backend.services;

import com.neuefische.backend.models.APIResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class WeatherApiService {
    private final WebClient webClient = WebClient.create("https://api.openweathermap.org/data/2.5");

    public Mono<APIResponse> getCurrentWeatherInfo(double lat, double lon) {
        return webClient.get()
                .uri("/weather?lat=" + lat + "&lon=" + lon + "&appid=" + System.getenv("APP_ID"))
                .retrieve()
                .bodyToMono(APIResponse.class);
    }
}
