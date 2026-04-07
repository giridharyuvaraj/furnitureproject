package com.example.furniture_backend.serviceimpl;

import com.example.furniture_backend.dto.UserDTO;
import com.example.furniture_backend.entity.User;
import com.example.furniture_backend.entity.PasswordResetToken;
import com.example.furniture_backend.repository.UserRepository;
import com.example.furniture_backend.repository.PasswordResetTokenRepository;
import com.example.furniture_backend.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepo;

    public UserServiceImpl(UserRepository repo, PasswordEncoder passwordEncoder, PasswordResetTokenRepository tokenRepo) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepo = tokenRepo;
    }

    @Override
    public UserDTO register(UserDTO dto) {


        repo.findByEmail(dto.getEmail()).ifPresent(u -> {
            throw new RuntimeException("Email already registered");
        });

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setAddress(dto.getAddress());
        user.setPostalCode(dto.getPostalCode());

        String requestedRole = dto.getRole();
        boolean wantsAdmin = requestedRole != null && "ADMIN".equalsIgnoreCase(requestedRole.trim());
        boolean adminExists = repo.countByRole("ADMIN") > 0;
        user.setRole(wantsAdmin && !adminExists ? "ADMIN" : "USER");

        User savedUser = repo.save(user);

        return mapToDTO(savedUser);
    }

    @Override
    public UserDTO login(String email, String password) {

        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return mapToDTO(user);
    }

    @Override
    public UserDTO findByEmail(String email) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToDTO(user);
    }

    @Override
    @Transactional
    public void createPasswordResetTokenForUser(String email, String token) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        
        // Remove old tokens if any
        tokenRepo.deleteByUser(user);
        
        PasswordResetToken myToken = new PasswordResetToken(token, user, LocalDateTime.now().plusHours(24));
        tokenRepo.save(myToken);
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetToken passToken = tokenRepo.findByToken(token)
                .orElse(null);

        if (passToken == null) {
            return "invalid";
        }

        if (passToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return "expired";
        }

        return "valid";
    }

    @Override
    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken passToken = tokenRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (passToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = passToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        repo.save(user);
        
        // Delete token after successful reset
        tokenRepo.delete(passToken);
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setAddress(user.getAddress());
        dto.setPostalCode(user.getPostalCode());
        dto.setRole(user.getRole() != null ? user.getRole() : "USER");
        return dto;
    }
}
