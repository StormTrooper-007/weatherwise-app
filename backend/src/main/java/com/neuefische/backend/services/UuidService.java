package com.neuefische.backend.services;


import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UuidService {
    public String generateNewId() {
        return UUID.randomUUID().toString();
    }
}
