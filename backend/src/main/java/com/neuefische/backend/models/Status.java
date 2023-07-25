package com.neuefische.backend.models;

public enum Status {
    OPEN("open"),
    DONE("done");
    private String status;

    Status(String s) {
        status = s;
    }

    public String getStatus() {
        return status;
    }

}
