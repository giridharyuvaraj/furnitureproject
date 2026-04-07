package com.example.furniture_backend.dto;

public class AuthResponse {

    private boolean success;
    private String message;
    private String token;
    private UserDTO user;

    public AuthResponse() {}

    public AuthResponse(String token, UserDTO user) {
        this.success = true;
        this.message = "Account created successfully";
        this.token = token;
        this.user = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
