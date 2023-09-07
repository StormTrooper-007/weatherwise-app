package com.neuefische.backend.security;

import org.hibernate.validator.constraints.NotBlank;

public record LoginRequest(
        @NotBlank
        String username,
        @NotBlank
        String password
) {
}


