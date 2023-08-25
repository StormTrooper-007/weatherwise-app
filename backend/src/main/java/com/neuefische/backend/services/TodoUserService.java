package com.neuefische.backend.services;

import com.neuefische.backend.exceptions.UserNotFoundException;
import com.neuefische.backend.security.TodoUser;
import com.neuefische.backend.security.TodoUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoUserService {
    private final TodoUserRepository todoUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final UuidService uuidService;

    public String getCurrentUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public TodoUser getCurrentUserId() throws UserNotFoundException {
        return todoUserRepository.findByUsername(getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException("User not logged in"));

    }

    public TodoUser registerNewUser(String username, String email, String password) throws IllegalArgumentException {
        if (todoUserRepository.findByUsername(username).isPresent() && todoUserRepository.findUserByEmail(email).isPresent()) {
            throw new IllegalArgumentException("User already Exists");
        }

        TodoUser newUser = new TodoUser();
        newUser.setId(uuidService.generateNewId());
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));

        return todoUserRepository.save(newUser);
    }
}


