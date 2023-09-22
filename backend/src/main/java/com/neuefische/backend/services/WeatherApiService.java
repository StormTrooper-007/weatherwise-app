package com.neuefische.backend.services;

import com.neuefische.backend.models.APIResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.nio.charset.Charset;

@Service
public class WeatherApiService {
    private final WebClient webClient = WebClient.create("https://api.openweathermap.org/data/2.5");

    public Mono<APIResponse> getCurrentWeatherInfo(double lat, double lon) {
        try {
            return webClient.get()
                    .uri("/weather?lat=" + lat + "&lon=" + lon + "&appid=" + System.getenv("APP_ID"))
                    .retrieve()
                    .bodyToMono(APIResponse.class);
        } catch (WebClientResponseException ex) {
            throw new WebClientResponseException(
                    401,
                    "Failed to fetch data from the remote server",
                    ex.getHeaders(),
                    ex.getResponseBodyAsByteArray(),
                    ex.getResponseBodyAs(Charset.class)
            );
        }

    }
}


