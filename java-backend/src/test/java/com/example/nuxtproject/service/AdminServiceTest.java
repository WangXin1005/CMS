package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Role;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository, new BCryptPasswordEncoder());
    }

    @Test
    void existsSuperAdmin_whenExists_shouldReturnTrue() {
        when(userRepository.existsByRole(Role.SUPERADMIN)).thenReturn(true);

        assertTrue(userService.existsSuperAdmin());
    }

    @Test
    void existsSuperAdmin_whenNotExists_shouldReturnFalse() {
        when(userRepository.existsByRole(Role.SUPERADMIN)).thenReturn(false);

        assertFalse(userService.existsSuperAdmin());
    }

    @Test
    void initSuperAdmin_shouldCreateAdmin() {
        when(userRepository.existsByRole(Role.SUPERADMIN)).thenReturn(false);
        when(userRepository.findByUsername("newadmin")).thenReturn(Optional.empty());
        when(userRepository.existsByEmail("new@test.com")).thenReturn(false);

        Map<String, String> result = userService.initSuperAdmin("newadmin", "new@test.com", "password123");

        assertTrue(result.get("message").contains("成功"));
        verify(userRepository).save(any(User.class));
    }

    @Test
    void initSuperAdmin_whenAlreadyExists_shouldReturnError() {
        when(userRepository.existsByRole(Role.SUPERADMIN)).thenReturn(true);

        Map<String, String> result = userService.initSuperAdmin("admin", "a@b.com", "pass");

        assertTrue(result.get("message").contains("已存在"));
        verify(userRepository, never()).save(any());
    }

    @Test
    void initSuperAdmin_whenUsernameTaken_shouldReturnError() {
        when(userRepository.existsByRole(Role.SUPERADMIN)).thenReturn(false);
        when(userRepository.findByUsername("existing")).thenReturn(Optional.of(new User()));

        Map<String, String> result = userService.initSuperAdmin("existing", "a@b.com", "pass");

        assertTrue(result.get("message").contains("已被使用"));
        verify(userRepository, never()).save(any());
    }

    @Test
    void initSuperAdmin_whenEmailTaken_shouldReturnError() {
        when(userRepository.existsByRole(Role.SUPERADMIN)).thenReturn(false);
        when(userRepository.findByUsername("newadmin")).thenReturn(Optional.empty());
        when(userRepository.existsByEmail("taken@test.com")).thenReturn(true);

        Map<String, String> result = userService.initSuperAdmin("newadmin", "taken@test.com", "pass");

        assertTrue(result.get("message").contains("已被使用"));
        verify(userRepository, never()).save(any());
    }
}
