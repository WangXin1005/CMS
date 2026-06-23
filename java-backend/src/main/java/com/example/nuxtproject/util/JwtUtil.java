package com.example.nuxtproject.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 工具类
 * <p>
 * 负责 JWT Token 的生成和验证。
 * Token 中携带以下声明（Claims）：
 * <ul>
 *   <li>sub - 用户 ID</li>
 *   <li>username - 用户名</li>
 *   <li>tokenVersion - Token 版本号（用于吊销旧 Token）</li>
 *   <li>role - 用户角色</li>
 *   <li>iat - 签发时间</li>
 *   <li>exp - 过期时间</li>
 * </ul>
 */
@Component
public class JwtUtil {

    /** HMAC-SHA 签名密钥 */
    private final SecretKey key;

    /** Token 过期时间（毫秒） */
    private final long expiration;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expiration = expiration;
    }

    /**
     * 生成 JWT Token
     *
     * @param userId       用户 ID（存于 sub 字段）
     * @param username     用户名
     * @param tokenVersion Token 版本号（修改密码时递增，使旧 Token 失效）
     * @param role         用户角色（如 "SUPERADMIN"）
     * @return JWT 字符串
     */
    public String generateToken(Long userId, String username, Integer tokenVersion, String role) {
        Date now = new Date();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("username", username)
                .claim("tokenVersion", tokenVersion)
                .claim("role", role)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + this.expiration))
                .signWith(this.key)
                .compact();
    }

    /**
     * 解析 JWT Token，获取所有声明
     */
    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(this.key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * 验证 Token 是否有效
     *
     * @return true=有效，false=无效或已过期
     */
    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /** 从 Token 中提取用户 ID */
    public Long getUserId(String token) {
        return Long.parseLong(parseToken(token).getSubject());
    }

    /** 从 Token 中提取用户名 */
    public String getUsername(String token) {
        return parseToken(token).get("username", String.class);
    }

    /** 从 Token 中提取 Token 版本号 */
    public Integer getTokenVersion(String token) {
        return parseToken(token).get("tokenVersion", Integer.class);
    }

    /** 从 Token 中提取用户角色 */
    public String getRole(String token) {
        return parseToken(token).get("role", String.class);
    }
}
