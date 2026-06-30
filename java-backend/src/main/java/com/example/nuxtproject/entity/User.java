/**
 * 用户实体 — 用户名、邮箱、BCrypt 密码、角色（SUPERADMIN/ADMIN/USER/GUEST）、Token 版本。
 */
package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password", "tokenVersion"})
@Table(name = "users", indexes = {
    @Index(name = "idx_user_role", columnList = "role")
})
public class User {

    @Schema(description = "用户 ID，自增主键")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "用户名，唯一且不可为空")
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Schema(description = "密码（BCrypt 加密后存储）")
    @Column(nullable = false, length = 200)
    private String password;

    @Schema(description = "邮箱，唯一且不可为空")
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Schema(description = "角色：SUPERADMIN / ADMIN / USER / GUEST")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    @Schema(description = "Token 版本号，用于令牌吊销（修改密码时递增，旧 Token 自动失效）")
    @Column(nullable = false)
    private Integer tokenVersion = 0;

    @Schema(description = "创建时间，不可更新")
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

        @JsonIgnore
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Integer getTokenVersion() { return tokenVersion; }
    public void setTokenVersion(Integer tokenVersion) { this.tokenVersion = tokenVersion; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
