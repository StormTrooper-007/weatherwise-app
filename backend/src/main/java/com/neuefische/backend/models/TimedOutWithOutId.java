package com.neuefische.backend.models;

public record TimedOutWithOutId(
        String plan,
        String startTime,
        String createdAt,
        String todoUserId
) {
}


