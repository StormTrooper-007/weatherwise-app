package com.neuefische.backend.security;

public record RegisterRequest(
        String username,
        String email,
        String password

) {
}
