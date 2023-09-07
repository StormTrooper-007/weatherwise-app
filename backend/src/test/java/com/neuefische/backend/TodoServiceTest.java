package com.neuefische.backend;

import com.neuefische.backend.exceptions.BadRequestException;
import com.neuefische.backend.exceptions.UserNotFoundException;
import com.neuefische.backend.models.TimedOut;
import com.neuefische.backend.models.TimedOutWithOutId;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.security.TodoUser;
import com.neuefische.backend.services.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class TodoServiceTest {

    TodoRepository todoRepository = mock(TodoRepository.class);
    TimedOutRepository timedOutRepository = mock(TimedOutRepository.class);
    UuidService uuidService = mock(UuidService.class);

    DateFormaterService dateFormaterService = mock(DateFormaterService.class);

    TodoUserService todoUserService = mock(TodoUserService.class);
    TimedOutService timedOutService = new TimedOutService(timedOutRepository, uuidService);

    TodoService todoService = new TodoService(
            todoRepository, uuidService, dateFormaterService, todoUserService
    );

    @Test
    void testCreateNewTodo() throws UserNotFoundException, BadRequestException {
        TodoWithOutIdAndStartTime todoWithOutId = new TodoWithOutIdAndStartTime(
                "my plan",
                "start time"
        );
        String nowTime = "2023-7-26T11:19:26.492745400";

        String expected = "new plan created successfully";
        when(uuidService.generateNewId()).thenReturn("1");
        when(dateFormaterService.getTimeStamp()).thenReturn(nowTime);
        when(todoUserService.getCurrentUserId()).thenReturn(new TodoUser("1", "username", "email", "password"));
        String actual = todoService.createNewTodo(todoWithOutId);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testGetAllTodos() {
        String laterTime = "2023-07-26 12:34:56.123456";
        String nowTime = "2023-07-27 12:34:56.123456";

        when(todoRepository.findAll()).thenReturn(Arrays.asList(
                new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", nowTime, "1"),
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", laterTime, "1")
        ));

        List<Todo> actual = todoService.getAllTodos();

        List<Todo> expected = Arrays.asList(
                new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", nowTime, "1"),
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", laterTime, "1")
        );

        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getUpcomingTodos() {
        String nowTime = "2023-07-27 12:34:56.123456";
        List<Todo> todos = List.of(
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", nowTime, "1")
        );

        when(dateFormaterService.calcTimeDiffInDays("2023-07-30T15:55:33.000+02:00")).thenReturn((long) 25);

        when(todoRepository.findAll()).thenReturn(todos);
        List<Todo> actual = List.of(
                new Todo("1", "go hiking", "2023-08-23T15:55:33.000+02:00", nowTime, "1")
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
        when(todoRepository.findById("1")).thenReturn(Optional.of(new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", nowTime, "1")));
        TodoWithOutIdAndStartTime todoWithOutId = new TodoWithOutIdAndStartTime(
                "go out to see friends",
                "2023-08-23T15:55:33.000+02:00"
        );

        Todo actual = todoService.editTodo(todoWithOutId, "1");
        Todo expected = new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", nowTime, "1");
        Assertions.assertNotEquals(expected, actual);
    }

    @Test
    void testSaveTimeOut() {
        TimedOutWithOutId timedOutWithOutId = new TimedOutWithOutId(
                "my plan", "my startTime", "created at", "todoUserId");
        TimedOut expected = new TimedOut(
                "1", "my plan", "my startTime", "created at", "todoUserId");
        when(uuidService.generateNewId()).thenReturn("1");
        when(timedOutService.saveTimedOut(timedOutWithOutId)).thenReturn(expected);

        TimedOut actual = timedOutService.saveTimedOut(timedOutWithOutId);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testDeleteTimedOut() {
        timedOutService.deleteTimedOut("1");
        verify(timedOutRepository).deleteById("1");
    }

    @Test
    void testGetAllTimedOuts() {
        when(timedOutRepository.findAll()).thenReturn(Arrays.asList(
                new TimedOut("1", "my plan", "startTime", "create at", "1")
        ));

        List<TimedOut> expected = Arrays.asList(
                new TimedOut("1", "my plan", "startTime", "create at", "1")
        );

        List<TimedOut> actual = timedOutService.getAllTimedOut();

        Assertions.assertEquals(expected, actual);
    }
}
