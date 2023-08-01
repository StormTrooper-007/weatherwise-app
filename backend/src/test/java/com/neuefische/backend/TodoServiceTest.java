package com.neuefische.backend;

import com.neuefische.backend.models.Status;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.services.DateFormaterService;
import com.neuefische.backend.services.TodoService;
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

    TodoService todoService = new TodoService(
            todoRepository, uuidService, dateFormaterService
    );

    @Test
    void testCreateNewTodo() {
        TodoWithOutId todoWithOutId = new TodoWithOutId(
                "go out to see friends",
                "2023-08-23T15:55:33.000+02:00"
        );
        String nowTime = "2023-7-26T11:19:26.492745400";

        Todo expected = new Todo(
                "1",
                todoWithOutId.plan(),
                todoWithOutId.startTime(),
                Status.OPEN.getStatus(),
                nowTime

        );
        when(uuidService.generateNewId()).thenReturn("1");
        when(todoService.createNewTodo(todoWithOutId)).thenReturn(expected);
        when(dateFormaterService.getTimeStamp()).thenReturn(nowTime);

        Todo actual = todoService.createNewTodo(todoWithOutId);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testGetAllTodos() {
        String laterTime = "2023-07-26 12:34:56.123456";
        String nowTime = "2023-07-27 12:34:56.123456";

        when(todoRepository.findAll()).thenReturn(Arrays.asList(
                new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime),
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", Status.OPEN.getStatus(), laterTime)
        ));

        List<Todo> actual = todoService.getAllTodos();

        List<Todo> expected = Arrays.asList(
                new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime),
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", Status.OPEN.getStatus(), laterTime)
        );

        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getUpcomingTodos() {
        String nowTime = "2023-07-27 12:34:56.123456";
        List<Todo> todos = List.of(
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime)
        );

        when(dateFormaterService.calcTimeDiffInDays("2023-07-30T15:55:33.000+02:00")).thenReturn((long) 25);

        when(todoRepository.findAll()).thenReturn(todos);
        List<Todo> actual = List.of(
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime)
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
        when(todoRepository.findById("1")).thenReturn(Optional.of(new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime)));
        TodoWithOutId todoWithOutId = new TodoWithOutId(
                "go out to see friends",
                "2023-08-23T15:55:33.000+02:00"
        );

        Todo actual = todoService.editTodo(todoWithOutId, "1");
        Todo expected = new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime);
        Assertions.assertNotEquals(expected, actual);
    }
}
