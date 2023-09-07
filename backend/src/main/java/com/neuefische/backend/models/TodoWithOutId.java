package com.neuefische.backend.models;

import jakarta.validation.constraints.NotBlank;

public record TodoWithOutId(
        @NotBlank(message = "enter your plan")
        String plan,
        @NotBlank(message = "set start time")
        String startTime
) {
}
