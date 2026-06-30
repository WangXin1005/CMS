/**
 * 用户控制器 — 超管检查/初始化 + 用户 CRUD（ADMIN/SUPERADMIN）+ 密码修改。
 */
package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.Role;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.entity.UserPrincipal;
import com.example.nuxtproject.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Tag(name = "用户管理", description = "用户的检查、初始化与 CRUD 接口")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/check")
    @Operation(summary = "检查超级管理员是否存在", description = "返回系统中是否已有超级管理员")
    public ResponseEntity<Map<String, Boolean>> checkSuperAdmin() {
        boolean exists = userService.existsSuperAdmin();
        return ResponseEntity.ok(Map.of("exists", exists));
    }
    @GetMapping("/check-username")
    @Operation(summary = "检查用户名是否已存在", description = "用于注册时校验用户名是否重复")
    public ResponseEntity<Map<String, Boolean>> checkUsername(
            @Parameter(description = "要检查的用户名", required = true) @RequestParam String username) {
        boolean taken = userService.isUsernameTaken(username);
        return ResponseEntity.ok(Map.of("taken", taken));
    }


    @PostMapping("/init")
    @Operation(summary = "初始化超级管理员",
               description = "创建第一个超级管理员账号，仅当系统中尚无超级管理员时有效")
    public ResponseEntity<?> initSuperAdmin(@RequestBody @Valid InitUserRequest request) {
        Map<String, String> result = userService.initSuperAdmin(
                request.getUsername(), request.getEmail(), request.getPassword());
        if (result.containsKey("message") && result.get("message").contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "获取用户列表", description = "分页返回所有用户（仅超级管理员和管理员可用）")
    public ResponseEntity<Page<User>> listUsers(
            @Parameter(description = "页码", required = true) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "每页条数", required = false) @RequestParam(defaultValue = "20") int size) {
        Page<User> users = userService.listUsers(PageRequest.of(Math.max(0, page - 1), size));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "获取用户详情", description = "根据 ID 查询用户信息")
    public ResponseEntity<?> getUser(
            @Parameter(description = "用户 ID", required = true) @PathVariable Long id) {
        java.util.Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.badRequest().body(Map.of("message", "用户不存在"));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "创建用户", description = "由超级管理员或管理员创建新用户")
    public ResponseEntity<?> createUser(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody @Valid CreateUserRequest request) {

        Role operatorRole = Role.valueOf(principal.role());
        Map<String, Object> result = userService.createUser(
                operatorRole, request.getUsername(), request.getEmail(),
                request.getPassword(), request.getRole());

        if (result.containsKey("message") && ((String) result.get("message")).contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "更新用户", description = "更新用户基本信息（用户名、邮箱、角色）")
    public ResponseEntity<?> updateUser(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "用户 ID", required = true) @PathVariable Long id,
            @RequestBody @Valid UpdateUserRequest request) {

        Role operatorRole = Role.valueOf(principal.role());
        Map<String, String> result = userService.updateUser(
                operatorRole, principal.userId(), id, request.getUsername(),
                request.getEmail(), request.getRole());

        if (result.containsKey("message") && result.get("message").contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @Operation(summary = "删除用户", description = "仅超级管理员可删除用户，且不能删除自己或最后一个超级管理员")
    public ResponseEntity<?> deleteUser(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "用户 ID", required = true) @PathVariable Long id) {

        Role operatorRole = Role.valueOf(principal.role());
        Map<String, String> result = userService.deleteUser(operatorRole, principal.userId(), id);

        if (result.containsKey("message") && result.get("message").contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    // ===== 请求体 DTO 类 =====

    public static class InitUserRequest {
        @Schema(description = "用户名", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "请输入用户名")
        @Size(min = 2, max = 50, message = "请输入用户名")
        private String username;

        @Schema(description = "邮箱地址", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "请输入邮箱")
        @Email(message = "请输入正确的邮箱格式")
        @Size(max = 100, message = "请输入邮箱")
        private String email;

        @Schema(description = "密码", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "请输入密码")
        @Size(min = 6, max = 100, message = "请输入密码")
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class CreateUserRequest {
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

        @Schema(description = "角色：SUPERADMIN / ADMIN / USER / GUEST", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Role role;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
}

    
    @PutMapping("/me/password")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "修改当前用户密码", description = "所有登录用户均可修改自己的密码")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody @Valid ChangePasswordRequest request) {
        Map<String, String> result = userService.changePassword(
                principal.userId(), request.getOldPassword(), request.getNewPassword());
        if (result.containsKey("message") && result.get("message").contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    public static class ChangePasswordRequest {
        @Schema(description = "原密码", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "请输入原密码")
        private String oldPassword;

        @Schema(description = "新密码", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "请输入新密码")
        @Size(min = 6, max = 100, message = "密码长度应在6-100之间")
        private String newPassword;

        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }

public static class UpdateUserRequest {
        @Schema(description = "用户名", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String username;

        @Schema(description = "邮箱地址", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String email;

        @Schema(description = "角色：SUPERADMIN / ADMIN / USER / GUEST", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Role role;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
}
}
