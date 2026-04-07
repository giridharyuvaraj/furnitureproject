package com.example.furniture_backend.controller;

import com.example.furniture_backend.dto.AuthResponse;
import com.example.furniture_backend.dto.UserDTO;
import com.example.furniture_backend.service.UserService;
import com.example.furniture_backend.service.JwtService;
import com.example.furniture_backend.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthController(UserService userService, JwtService jwtService, EmailService emailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody UserDTO dto) {
        UserDTO user = userService.register(dto);
        String token = jwtService.generateToken(user.getEmail(), user.getId(), user.getUsername());
        return new ResponseEntity<>(new AuthResponse(token, user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserDTO dto) {
        UserDTO user = userService.login(dto.getEmail(), dto.getPassword());
        String token = jwtService.generateToken(user.getEmail(), user.getId(), user.getUsername());
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // email is the subject in our JWT
        String email = authentication.getName();
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            String token = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(email, token);
            emailService.sendPasswordResetEmail(email, token);
            return ResponseEntity.ok(Map.of("message", "Password reset link sent to your email."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        
        String result = userService.validatePasswordResetToken(token);
        if (!result.equals("valid")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Invalid or expired token."));
        }
        
        try {
            userService.resetPassword(token, newPassword);
            return ResponseEntity.ok(Map.of("message", "Password updated successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }
}
