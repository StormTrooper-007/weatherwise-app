package com.neuefische.backend;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.neuefische.backend.models.Status;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.services.TodoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TodoIntegrationTest {
    @Autowired
    TodoRepository todoRepository;
    @Autowired
    TodoService todoService;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateTodo() throws Exception {
        TodoWithOutId todoWithOutId = new TodoWithOutId("play football", "2023-08-23T15:55:33.000+02:00");
        String requestBody = objectMapper.writeValueAsString(todoWithOutId);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/todos")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.plan").value("play football"))
                .andExpect(jsonPath("$.startTime").value("2023-08-23T15:55:33.000+02:00"));
    }

    @Test
    void testGetAllTodos() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todos"))
                .andExpect(status().isOk());

    }

    @Test
    void testUpcomingTodos() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todos/upcoming"))
                .andExpect(status().isOk());
    }

    @Test
    void test_deleteTodo() throws Exception {
        String nowTime = "2023-07-27 12:34:56.123456";
        Todo newTodo = new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime);
        todoRepository.save(newTodo);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/todos/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testEditTodo() throws Exception {
        String nowTime = "2023-07-27 12:34:56.123456";
        Todo newTodo = new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime);
        todoRepository.save(newTodo);
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/todos/1")
                                .content(objectMapper.writeValueAsBytes(new Todo("1", "go to church", "2023-09-26T15:55:33.000+02:00", Status.OPEN.getStatus(), nowTime)))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {"id": "1", "plan":"go to church", "startTime": "2023-09-26T15:55:33.000+02:00", "status": "open", "createdAt":"2023-07-27 12:34:56.123456"}
                        """));
    }
}
