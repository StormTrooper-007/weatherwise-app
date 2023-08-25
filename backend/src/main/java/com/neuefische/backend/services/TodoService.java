package com.neuefische.backend.services;

import com.neuefische.backend.TodoRepository;
import com.neuefische.backend.exceptions.BadRequestException;
import com.neuefische.backend.exceptions.UserNotFoundException;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.logging.Level;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UuidService uuidService;
    private final DateFormaterService dateFormaterService;
    private final TodoUserService todoUserService;

    Logger logger = Logger.getLogger(TodoService.class.getName());


    public String createNewTodo(TodoWithOutId todoWithOutId) throws UserNotFoundException, BadRequestException {
        Todo newTodo = new Todo();
        newTodo.setId(uuidService.generateNewId());
        newTodo.setPlan(todoWithOutId.plan());
        newTodo.setStartTime(todoWithOutId.startTime());
        newTodo.setCreatedAt(dateFormaterService.getTimeStamp());
        try {
            newTodo.setTodoUserId(todoUserService.getCurrentUserId().getId());
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException("User not found");
        }
        todoRepository.save(newTodo);
        return "new plan created successfully";
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


