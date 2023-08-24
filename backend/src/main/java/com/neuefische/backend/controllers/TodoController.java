package com.neuefische.backend.controllers;

import com.neuefische.backend.exceptions.BadRequestException;
import com.neuefische.backend.exceptions.UserNotFoundException;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.services.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<String> createNewTodo(@Valid @RequestBody TodoWithOutId todoWithOutId) {
        try {
            todoService.createNewTodo(todoWithOutId);
            return ResponseEntity.ok("new plan created successfully");
        } catch (BadRequestException ex) {
            return handleInvalidRequest("invalid credentials entered");
        } catch (UserNotFoundException ex) {
            return handleUserNotFoundException("Sorry could not find user");
        }
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/upcoming")
    public List<Todo> getUpcomingTodos() {
        return todoService.getUpcomingTodos();
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable String id) {
        todoService.deleteTodo(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> editAnimal(@RequestBody TodoWithOutId todoWithOutId, @PathVariable String id) {
        Todo newTodo = todoService.editTodo(todoWithOutId, id);
        return ResponseEntity.ok(newTodo);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleInvalidRequest(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

}


