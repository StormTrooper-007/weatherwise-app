package com.neuefische.backend.controllers;


import com.neuefische.backend.security.RegisterRequest;
import com.neuefische.backend.services.TodoUserService;
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
    public ResponseEntity<String> registerNewUser(@RequestBody RegisterRequest registerRequest) {
        todoUserService.registerNewUser(registerRequest.username(), registerRequest.email(), registerRequest.password());
        return ResponseEntity.ok("New with username" + registerRequest.username() + "created successfully");
    }
}
