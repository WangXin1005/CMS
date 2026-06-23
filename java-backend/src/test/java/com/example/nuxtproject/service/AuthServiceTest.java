package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Role;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.UserRepository;
import com.example.nuxtproject.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    private JwtUtil jwtUtil;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil(
                "test-secret-key-that-is-at-least-32-bytes-long-for-hs256",
                3600000L);
        authService = new AuthService(userRepository, new BCryptPasswordEncoder(), jwtUtil);
    }

    @Test
    void login_withValidCredentials_shouldReturnToken() {
        User user = new User("admin", "admin@test.com",
                new BCryptPasswordEncoder().encode("password"), Role.SUPERADMIN);
        user.setId(1L);
        when(userRepository.findByUsernameOrEmail("admin")).thenReturn(Optional.of(user));

        Map<String, Object> result = authService.login("admin", "password");

        assertNotNull(result);
        assertNotNull(result.get("token"));
        assertEquals("admin", result.get("username"));
        assertEquals("SUPERADMIN", result.get("role"));
    }

    @Test
    void login_withInvalidPassword_shouldReturnNull() {
        User user = new User("admin", "admin@test.com",
                new BCryptPasswordEncoder().encode("password"), Role.SUPERADMIN);
        when(userRepository.findByUsernameOrEmail("admin")).thenReturn(Optional.of(user));

        Map<String, Object> result = authService.login("admin", "wrongpassword");

        assertNull(result);
    }

    @Test
    void login_withNonExistentUser_shouldReturnNull() {
        when(userRepository.findByUsernameOrEmail("unknown")).thenReturn(Optional.empty());

        Map<String, Object> result = authService.login("unknown", "password");

        assertNull(result);
    }

    @Test
    void login_shouldUseSingleQuery() {
        User user = new User("admin", "admin@test.com",
                new BCryptPasswordEncoder().encode("password"), Role.SUPERADMIN);
        user.setId(1L);
        when(userRepository.findByUsernameOrEmail(any())).thenReturn(Optional.of(user));

        authService.login("admin@test.com", "password");

        verify(userRepository, times(1)).findByUsernameOrEmail(any());
        verify(userRepository, never()).findByUsername(any());
        verify(userRepository, never()).findByEmail(any());
    }
}
