package com.neuefische.backend.controllers;

import com.neuefische.backend.services.WeatherApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class WeatherApiController {

    private final WeatherApiService weatherApiService;

    @GetMapping("/weather/{lat}/{lon}")
    public Mono<?> getCurrentWeatherInfo(@PathVariable double lat, @PathVariable double lon) {
        try {
            return weatherApiService.getCurrentWeatherInfo(lat, lon);
        } catch (WebClientResponseException ex) {
            return handleWebClientException("failed to get weather info from remote server");
        }
    }

    @ExceptionHandler(WebClientResponseException.class)
    public Mono<String> handleWebClientException(String message) {
        return Mono.just(message);
    }
}


