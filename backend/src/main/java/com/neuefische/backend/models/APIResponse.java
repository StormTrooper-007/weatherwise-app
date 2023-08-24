package com.neuefische.backend.models;

import java.util.List;

public record APIResponse(
        Coordinates coord,
        MainInfo main,
        List<Weather> weather,
        Clouds clouds,
        String name
) {
}



