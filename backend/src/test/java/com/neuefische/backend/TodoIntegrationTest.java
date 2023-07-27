package com.neuefische.backend;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.services.TodoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        TodoWithOutId todoWithOutId = new TodoWithOutId("play football", "Fri, 25 Aug 2023 02:00:00 GMT");
        String requestBody = objectMapper.writeValueAsString(todoWithOutId);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/todos")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.plan").value("play football"))
                .andExpect(jsonPath("$.startTime").value("Fri, 25 Aug 2023 02:00:00 GMT"));
    }

    @Test
    void testGetAllTodos() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todos"))
                .andExpect(status().isOk())
                .andReturn();
    }
}
