package com.neuefische.backend.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
public class LoginErrorResponse {
    private Map<String, String> errors;

    public LoginErrorResponse() {
        this.errors = new HashMap<>();
    }

    public void addError(String fieldName, String errorMessage) {
        errors.put(fieldName, errorMessage);
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
