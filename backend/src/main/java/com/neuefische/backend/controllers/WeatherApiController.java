package com.neuefische.backend.controllers;


import com.neuefische.backend.models.APIResponse;
import com.neuefische.backend.services.WeatherApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class WeatherApiController {

    private final WeatherApiService weatherApiService;

    @GetMapping("/weather/{lat}/{lon}")
    public Mono<APIResponse> getCurrentWeatherInfo(@PathVariable double lat, @PathVariable double lon) {
        return weatherApiService.getCurrentWeatherInfo(lat, lon);
    }
}
