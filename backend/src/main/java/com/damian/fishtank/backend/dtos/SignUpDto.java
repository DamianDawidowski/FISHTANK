package com.damian.fishtank.backend.dtos;

public record SignUpDto (String firstName, String lastName, String login, char[] password) { }
