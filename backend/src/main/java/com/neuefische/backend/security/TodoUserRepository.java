package com.neuefische.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TodoUserRepository extends MongoRepository<TodoUser, String> {
    Optional<TodoUser> findByUsername(String username);

    Optional<TodoUser> findUserByEmail(String email);

}



