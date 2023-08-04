package com.neuefische.backend;

import com.neuefische.backend.exceptions.UserNotFoundException;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.security.TodoUser;
import com.neuefische.backend.services.DateFormaterService;
import com.neuefische.backend.services.TodoService;
import com.neuefische.backend.services.TodoUserService;
import com.neuefische.backend.services.UuidService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class TodoServiceTest {

    TodoRepository todoRepository = mock(TodoRepository.class);
    UuidService uuidService = mock(UuidService.class);

    DateFormaterService dateFormaterService = mock(DateFormaterService.class);

    TodoUserService todoUserService = mock(TodoUserService.class);

    TodoService todoService = new TodoService(
            todoRepository, uuidService, dateFormaterService, todoUserService
    );

    @Test
    void testCreateNewTodo() throws UserNotFoundException {
        TodoWithOutId todoWithOutId = new TodoWithOutId(
                "go out to see friends",
                "2023-08-23T15:55:33.000+02:00"
        );
        String nowTime = "2023-7-26T11:19:26.492745400";

        Todo expected = new Todo(
                "1",
                todoWithOutId.plan(),
                todoWithOutId.startTime(),
                false,
                nowTime,
                "1"
        );
        when(uuidService.generateNewId()).thenReturn("1");
        when(dateFormaterService.getTimeStamp()).thenReturn(nowTime);
        when(todoUserService.getCurrentUserId()).thenReturn(new TodoUser("1", "username", "email", "password"));
        when(todoService.createNewTodo(todoWithOutId)).thenReturn(expected);

        Todo actual = todoService.createNewTodo(todoWithOutId);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testGetAllTodos() {
        String laterTime = "2023-07-26 12:34:56.123456";
        String nowTime = "2023-07-27 12:34:56.123456";

        when(todoRepository.findAll()).thenReturn(Arrays.asList(
                new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", false, nowTime, "1"),
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", false, laterTime, "1")
        ));

        List<Todo> actual = todoService.getAllTodos();

        List<Todo> expected = Arrays.asList(
                new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", false, nowTime, "1"),
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", false, laterTime, "1")
        );

        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getUpcomingTodos() {
        String nowTime = "2023-07-27 12:34:56.123456";
        List<Todo> todos = List.of(
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", false, nowTime, "1")
        );

        when(dateFormaterService.calcTimeDiffInDays("2023-07-30T15:55:33.000+02:00")).thenReturn((long) 25);

        when(todoRepository.findAll()).thenReturn(todos);
        List<Todo> actual = List.of(
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", false, nowTime, "1")
        );
        List<Todo> expected = todoService.getUpcomingTodos();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testDeleteTodo() {
        todoService.deleteTodo("1");
        verify(todoRepository).deleteById("1");
    }

    @Test
    void testEditTodo() {
        String nowTime = "2023-07-27 12:34:56.123456";
        when(todoRepository.findById("1")).thenReturn(Optional.of(new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", false, nowTime, "1")));
        TodoWithOutId todoWithOutId = new TodoWithOutId(
                "go out to see friends",
                "2023-08-23T15:55:33.000+02:00"
        );

        Todo actual = todoService.editTodo(todoWithOutId, "1");
        Todo expected = new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", false, nowTime, "1");
        Assertions.assertNotEquals(expected, actual);
    }
}
