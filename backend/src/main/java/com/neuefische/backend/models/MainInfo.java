package com.neuefische.backend.models;


public record MainInfo(
        double temp,
        double feels_like,
        double temp_min,
        double temp_max
) {
}
