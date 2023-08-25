package com.neuefische.backend.services;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;


@Service
public class DateFormaterService {
    public String getTimeStamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.now().format(formatter);
    }

    public long calcTimeDiffInDays(String startTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        ZonedDateTime givenTime = ZonedDateTime.parse(startTime, formatter);

        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.systemDefault());
        Duration duration = Duration.between(currentTime, givenTime);

        return duration.toDays();
    }
}


