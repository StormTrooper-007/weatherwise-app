package com.neuefische.backend.security;

public record LoginRequest(
        String email,
        String password
) {
}
