package com.neuefische.backend.services;

import com.neuefische.backend.TodoRepository;
import com.neuefische.backend.exceptions.UserNotFoundException;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UuidService uuidService;
    private final DateFormaterService dateFormaterService;
    private final TodoUserService todoUserService;


    public Todo createNewTodo(TodoWithOutId todoWithOutId) throws UserNotFoundException {
        Todo newTodo = new Todo();
        newTodo.setId(uuidService.generateNewId());
        newTodo.setPlan(todoWithOutId.plan());
        newTodo.setStartTime(todoWithOutId.startTime());
        newTodo.setTimerStarted(false);
        newTodo.setCreatedAt(dateFormaterService.getTimeStamp());
        newTodo.setTodoUserId(todoUserService.getCurrentUserId().getId());
        todoRepository.save(newTodo);
        return newTodo;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public List<Todo> getUpcomingTodos() {
        return todoRepository.findAll().stream().filter(todo
                -> dateFormaterService.calcTimeDiffInDays(todo.getStartTime()) < 2).toList();
    }

    public Todo editTodo(TodoWithOutId todoWithOutId, String id) {
        Todo isEditTodo = todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Todo not found"));
        isEditTodo.setPlan(todoWithOutId.plan());
        isEditTodo.setStartTime(todoWithOutId.startTime());
        return todoRepository.save(isEditTodo);
    }

    public void deleteTodo(String id) {
        todoRepository.deleteById(id);
    }


}
