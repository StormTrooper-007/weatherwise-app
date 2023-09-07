package com.neuefische.backend.security;


import com.neuefische.backend.exceptions.BadRequestException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class TodoUserController {

    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.status(HttpStatus.OK).body(SecurityContextHolder.getContext().getAuthentication().getName());

    }

    @GetMapping("/user")
    public String getCurrentUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleLoginValidationException() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials entered");
    }

}


