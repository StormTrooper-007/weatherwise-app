package com.neuefische.backend.exceptions;

import org.springframework.web.bind.MethodArgumentNotValidException;

public class BadRequestException extends Exception {
    public BadRequestException(String message) {
        super(message);
    }
}



