package com.neuefische.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("timed-outs")
public class TimedOut {
    @Id
    private String id;
    private String plan;
    private String startTime;
    private String createdAt;
    private String todoUserId;
}
