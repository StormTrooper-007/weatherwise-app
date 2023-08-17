package com.neuefische.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.neuefische.backend.models.TimedOut;
import com.neuefische.backend.models.TimedOutWithOutId;
import com.neuefische.backend.models.Todo;
import com.neuefische.backend.models.TodoWithOutId;
import com.neuefische.backend.security.LoginRequest;
import com.neuefische.backend.security.RegisterRequest;
import com.neuefische.backend.services.TodoService;
import com.neuefische.backend.services.TodoUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TodoIntegrationTest {
    @Autowired
    TodoRepository todoRepository;
    @Autowired
    TimedOutRepository timedOutRepository;
    @Autowired
    TodoService todoService;
    @Autowired
    TodoUserService todoUserService;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser
    void testCreateTodo() throws Exception {
        TodoWithOutId todoWithOutId = new TodoWithOutId("play football", "2023-08-23T15:55:33.000+02:00");
        String requestBody = objectMapper.writeValueAsString(todoWithOutId);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/todos")
                        .with(csrf())
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.plan").value("play football"))
                .andExpect(jsonPath("$.startTime").value("2023-08-23T15:55:33.000+02:00"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetAllTodos() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todos").with(csrf()))
                .andExpect(status().isOk());

    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testUpcomingTodos() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todos/upcoming").with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void test_deleteTodo() throws Exception {
        String nowTime = "2023-07-27 12:34:56.123456";
        Todo newTodo = new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", nowTime, "id");
        todoRepository.save(newTodo);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/todos/1").with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testEditTodo() throws Exception {
        String nowTime = "2023-07-27 12:34:56.123456";
        Todo newTodo = new Todo("1", "go bike riding", "2023-08-26T15:55:33.000+02:00", nowTime, "1");
        todoRepository.save(newTodo);
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/todos/1")
                                .with(csrf())
                                .content(objectMapper.writeValueAsBytes(new Todo("1", "go to church", "2023-09-26T15:55:33.000+02:00", nowTime, "1")))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {"id": "1", "plan":"go to church", "startTime": "2023-09-26T15:55:33.000+02:00", "createdAt":"2023-07-27 12:34:56.123456", "todoUserId": "1"}
                        """));
    }


    @Test
    @DirtiesContext
    void testLogout() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/logout")
                )
                .andExpect(status().isOk())
                .andExpect(content().string("logged out successfully"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testLogin() throws Exception {
        LoginRequest loginRequest = new LoginRequest("chigbo.c.o@gmail.com", "abcd");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest))
                )
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testRegsiterUser() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest("collins", "chigbo.c.o@gmail.com", "abcd");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                        .with(csrf())
                        .content(objectMapper.writeValueAsString(registerRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetCurrentUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/user")
                        .with(csrf())
                )
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testSaveTimeOut() throws Exception {
        TimedOutWithOutId timedOutWithOutId = new TimedOutWithOutId(
                "my plan",
                "2023-08-23T15:55:33.000+02:00",
                "nowtime", "userId"
        );
        String requestBody = objectMapper.writeValueAsString(timedOutWithOutId);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/timedout")
                        .with(csrf())
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.plan").value("my plan"))
                .andExpect(jsonPath("$.startTime").value("2023-08-23T15:55:33.000+02:00"))
                .andExpect(jsonPath("$.createdAt").value("nowtime"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetAllTimedOuts() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/timedout").with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testDeleteTimedOut() throws Exception {
        String id = "1";
        TimedOut newTimedOut = new TimedOut();
        timedOutRepository.save(newTimedOut);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/timedout/1").with(csrf()))
                .andExpect(status().isOk());
    }


}
