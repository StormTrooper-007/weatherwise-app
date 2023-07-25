package com.neuefische.backend.services;

import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;


@Service
public class DateFormaterService {
    public String getZonedDateTime() {
        ZonedDateTime now = ZonedDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS Z");
        return now.format(formatter);
    }

}
