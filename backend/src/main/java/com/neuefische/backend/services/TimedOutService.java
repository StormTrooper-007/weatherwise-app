package com.neuefische.backend.services;

import com.neuefische.backend.TimedOutRepository;
import com.neuefische.backend.models.TimedOut;
import com.neuefische.backend.models.TimedOutWithOutId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimedOutService {

    private final TimedOutRepository timedOutRepository;

    private final UuidService uuidService;

    public TimedOut saveTimedOut(TimedOutWithOutId timedOutWithOutId) {
        TimedOut newTimedOut = new TimedOut();
        newTimedOut.setId(uuidService.generateNewId());
        newTimedOut.setPlan(timedOutWithOutId.plan());
        newTimedOut.setStartTime(timedOutWithOutId.startTime());
        newTimedOut.setCreatedAt(timedOutWithOutId.createdAt());
        newTimedOut.setTodoUserId(timedOutWithOutId.todoUserId());
        timedOutRepository.save(newTimedOut);
        return newTimedOut;
    }

    public List<TimedOut> getAllTimedOut() {
        return timedOutRepository.findAll();
    }

    public void deleteTimedOut(String id) {
        timedOutRepository.deleteById(id);
    }

}
