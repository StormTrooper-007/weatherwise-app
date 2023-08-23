package com.neuefische.backend.models;

import jakarta.validation.constraints.NotBlank;

public record TodoWithOutId(
        @NotBlank(message = "enter your plan for the date")
        String plan,
        @NotBlank(message = "enter your start time")
        String startTime

) {
}
