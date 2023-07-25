package com.neuefische.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("todos")
public class Todo {
    @Id
    private String id;
    private String plan;
    private String startTime;
    private String status;
    private String createdAt;
}
