package com.neuefische.backend.controllers;


import com.neuefische.backend.security.RegisterRequest;
import com.neuefische.backend.services.TodoUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AuthController {

    private final TodoUserService todoUserService;

    @PostMapping("/register")
    public ResponseEntity<String> registerNewUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            todoUserService.registerNewUser(registerRequest.username(), registerRequest.email(), registerRequest.password());
            return ResponseEntity.ok("New user " + "   " + registerRequest.username() + "  " + " created successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getLocalizedMessage());
        }
    }
}



