package com.neuefische.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.neuefische.backend.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class WeatherApiServiceIntegrationTest {

    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetCurrentWeatherInfo() throws Exception {
        APIResponse response = new APIResponse(
                new Coordinates(48, 11),
                new MainInfo(200, 200, 200, 200),
                Arrays.asList(
                        new Weather(1, "weather", "weather"),
                        new Weather(2, "weather2", "weather2")
                ),
                new Clouds(80),
                "munich"
        );

        String actual = objectMapper.writeValueAsString(response);

        WebClient.ResponseSpec responseSpecMock = mock(WebClient.ResponseSpec.class);
        when(responseSpecMock.bodyToMono(String.class)).thenReturn(Mono.just(actual));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/weather/48/11")
                        .with(csrf()))
                .andExpect(status().isOk());

    }
}
