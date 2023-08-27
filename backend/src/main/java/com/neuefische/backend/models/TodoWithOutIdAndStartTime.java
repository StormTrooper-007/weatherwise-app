package com.neuefische.backend.models;

import jakarta.validation.constraints.NotBlank;

public record TodoWithOutIdAndStartTime(
        @NotBlank(message = "you need to enter a future plan")
        String plan
) {
}


