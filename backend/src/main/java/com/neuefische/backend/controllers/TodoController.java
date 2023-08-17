package com.neuefische.backend.controllers;

import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.services.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<Todo> createNewTodo(@RequestBody TodoWithOutId todoWithOutId) {
        Todo newTodo = todoService.createNewTodo(todoWithOutId);
        return ResponseEntity.ok(newTodo);
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

}
