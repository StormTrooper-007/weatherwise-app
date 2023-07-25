package com.neuefische.backend.services;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

@Service
public class DateFormaterService {
    public String getZonedDateTime() {
        String now = Instant.now().toString();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("E, d MMM uuuu H:mm", Locale.ENGLISH);
        return ZonedDateTime.parse(now, formatter).toString();
    }

}
