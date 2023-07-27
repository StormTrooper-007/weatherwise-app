package com.neuefische.backend.models;

public enum Status {
    OPEN("open"),
    DONE("done");
    private final String stat;

    Status(String s) {
        stat = s;
    }

    public String getStatus() {
        return stat;
    }

}
