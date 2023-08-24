package com.neuefische.backend.controllers;

import com.neuefische.backend.models.TimedOut;
import com.neuefische.backend.models.TimedOutWithOutId;
import com.neuefische.backend.services.TimedOutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timedout")
@RequiredArgsConstructor
public class TimedOutController {

    private final TimedOutService timedOutService;

    @PostMapping
    public ResponseEntity<TimedOut> saveTimedOut(@RequestBody TimedOutWithOutId timedOutWithOutId) {
        return ResponseEntity.ok(timedOutService.saveTimedOut(timedOutWithOutId));
    }

    @GetMapping
    public ResponseEntity<List<TimedOut>> getAllTimedOut() {
        return ResponseEntity.ok(timedOutService.getAllTimedOut());
    }

    @DeleteMapping("/{id}")
    public void deleteTimedOut(@PathVariable String id) {
        timedOutService.deleteTimedOut(id);
    }

}


