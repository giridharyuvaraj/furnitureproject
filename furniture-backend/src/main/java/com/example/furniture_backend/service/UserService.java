package com.example.furniture_backend.service;

import com.example.furniture_backend.dto.UserDTO;

public interface UserService {

    UserDTO register(UserDTO userDTO);
    UserDTO login(String email, String password);
    UserDTO findByEmail(String email);
    void createPasswordResetTokenForUser(String email, String token);
    String validatePasswordResetToken(String token);
    void resetPassword(String token, String newPassword);
}
