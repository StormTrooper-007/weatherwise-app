package com.neuefische.backend.models;

public record Weather(
        int id,
        String main,
        String description
) {
}
