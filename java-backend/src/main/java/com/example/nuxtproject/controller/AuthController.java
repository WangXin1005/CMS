package com.example.nuxtproject.controller;

import com.example.nuxtproject.service.AuthService;
import com.example.nuxtproject.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "认证管理", description = "用户登录、注册与 Token 颁发接口")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    @Operation(summary = "用户登录", description = "验证用户名和密码，返回 JWT Token 及角色信息")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        Map<String, Object> result = authService.login(request.getUsername(), request.getPassword());
        if (result == null) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "用户名或密码错误"));
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/register")
    @Operation(summary = "访客注册", description = "访客自助注册账号，注册后自动获得 GUEST 角色（只读权限）")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        Map<String, String> result = userService.registerGuest(
                request.getUsername(), request.getEmail(), request.getPassword());
        if (result.containsKey("message") && result.get("message").contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    // ===== 请求体 DTO 类 =====

    public static class LoginRequest {
        @Schema(description = "用户名", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "用户名不能为空")
        private String username;

        @Schema(description = "密码", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "密码不能为空")
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        @Schema(description = "用户名", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "用户名不能为空")
        @Size(min = 2, max = 50, message = "用户名长度应在2-50之间")
        private String username;

        @Schema(description = "邮箱地址", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "邮箱不能为空")
        @Email(message = "邮箱格式不正确")
        @Size(max = 100, message = "邮箱长度不能超过100")
        private String email;

        @Schema(description = "密码", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "密码不能为空")
        @Size(min = 6, max = 100, message = "密码长度应在6-100之间")
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
