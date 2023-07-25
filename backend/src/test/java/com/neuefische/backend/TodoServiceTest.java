package com.neuefische.backend;

import com.neuefische.backend.models.Status;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.services.DateFormaterService;
import com.neuefische.backend.services.TodoService;
import com.neuefische.backend.services.UuidService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

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
                "Fri, 25 Aug 2023 02:00:00 GMT"
        );

        String nowTime = Instant.now().toString();

        Todo expected = new Todo(
                "1",
                todoWithOutId.plan(),
                todoWithOutId.startTime(),
                Status.OPEN.getStatus(),
                nowTime
        );
        when(uuidService.generateNewId()).thenReturn("1");
        when(todoService.createNewTodo(todoWithOutId)).thenReturn(expected);
        when(dateFormaterService.getZonedDateTime()).thenReturn(nowTime);

        Todo actual = todoService.createNewTodo(todoWithOutId);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testGetAllTodos() {
        String laterTime = Instant.now().plus(30, ChronoUnit.MINUTES).toString();
        String nowTime = Instant.now().toString();

        when(todoRepository.findAll()).thenReturn(Arrays.asList(
                new Todo("1", "go bike riding", "Fri, 25 Aug 2023 02:00:00 GMT", Status.OPEN.getStatus(), nowTime),
                new Todo("1", "go hiking", "Fri, 5 Sep 2023 02:00:00 GMT", Status.OPEN.getStatus(), laterTime)
        ));

        List<Todo> actual = todoService.getAllTodos();

        List<Todo> expected = Arrays.asList(
                new Todo("1", "go bike riding", "Fri, 25 Aug 2023 02:00:00 GMT", Status.OPEN.getStatus(), nowTime),
                new Todo("1", "go hiking", "Fri, 5 Sep 2023 02:00:00 GMT", Status.OPEN.getStatus(), laterTime)
        );

        Assertions.assertEquals(expected, actual);
    }
}
