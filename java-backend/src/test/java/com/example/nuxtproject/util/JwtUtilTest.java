package com.example.nuxtproject.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil(
                "test-secret-key-that-is-at-least-32-bytes-long-for-hs256",
                3600000L);
    }

    @Test
    void generateToken_shouldProduceValidToken() {
        String token = jwtUtil.generateToken(1L, "admin", 0, "SUPERADMIN");

        assertNotNull(token);
        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnTrueForValidToken() {
        String token = jwtUtil.generateToken(1L, "admin", 0, "SUPERADMIN");

        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnFalseForInvalidToken() {
        assertFalse(jwtUtil.validateToken("invalid.token.here"));
    }

    @Test
    void getUserId_shouldReturnCorrectId() {
        String token = jwtUtil.generateToken(42L, "admin", 0, "SUPERADMIN");

        assertEquals(42L, jwtUtil.getUserId(token));
    }

    @Test
    void getUsername_shouldReturnCorrectUsername() {
        String token = jwtUtil.generateToken(1L, "testuser", 0, "ADMIN");

        assertEquals("testuser", jwtUtil.getUsername(token));
    }

    @Test
    void getTokenVersion_shouldReturnCorrectVersion() {
        String token = jwtUtil.generateToken(1L, "admin", 5, "SUPERADMIN");

        assertEquals(5, jwtUtil.getTokenVersion(token));
    }

    @Test
    void getRole_shouldReturnCorrectRole() {
        String token = jwtUtil.generateToken(1L, "admin", 0, "GUEST");

        assertEquals("GUEST", jwtUtil.getRole(token));
    }

    @Test
    void validateToken_shouldReturnFalseForExpiredToken() {
        JwtUtil shortLived = new JwtUtil(
                "test-secret-key-that-is-at-least-32-bytes-long-for-hs256",
                -1000L);
        String token = shortLived.generateToken(1L, "admin", 0, "SUPERADMIN");

        assertFalse(shortLived.validateToken(token));
    }
}
