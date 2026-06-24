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
@Tag(name = "鐢ㄦ埛绠＄悊", description = "鐢ㄦ埛鐨勬鏌ャ€佸垵濮嬪寲涓?CRUD 鎺ュ彛")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/check")
    @Operation(summary = "妫€鏌ヨ秴绾х鐞嗗憳鏄惁瀛樺湪", description = "杩斿洖绯荤粺涓槸鍚﹀凡鏈夎秴绾х鐞嗗憳")
    public ResponseEntity<Map<String, Boolean>> checkSuperAdmin() {
        boolean exists = userService.existsSuperAdmin();
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @GetMapping("/check-username")
    @Operation(summary = "妫€鏌ョ敤鎴峰悕鏄惁宸插瓨鍦?, description = "鐢ㄤ簬娉ㄥ唽鏃舵牎楠岀敤鎴峰悕鏄惁閲嶅")
    public ResponseEntity<Map<String, Boolean>> checkUsername(
            @Parameter(description = "瑕佹鏌ョ殑鐢ㄦ埛鍚?, required = true) @RequestParam String username) {
        boolean taken = userService.isUsernameTaken(username);
        return ResponseEntity.ok(Map.of("taken", taken));
    }

    @PostMapping("/init")
    @Operation(summary = "鍒濆鍖栬秴绾х鐞嗗憳",
               description = "鍒涘缓绗竴涓秴绾х鐞嗗憳璐﹀彿锛屼粎褰撶郴缁熶腑灏氭棤瓒呯骇绠＄悊鍛樻椂鏈夋晥")
    public ResponseEntity<?> initSuperAdmin(@RequestBody @Valid InitUserRequest request) {
        Map<String, String> result = userService.initSuperAdmin(
                request.getUsername(), request.getEmail(), request.getPassword());
        if (result.containsKey("message") && result.get("message").contains("鎴愬姛")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "鑾峰彇鐢ㄦ埛鍒楄〃", description = "鍒嗛〉杩斿洖鎵€鏈夌敤鎴凤紙浠呰秴绾х鐞嗗憳鍜岀鐞嗗憳鍙敤锛?)
    public ResponseEntity<Page<User>> listUsers(
            @Parameter(description = "椤电爜", required = true) @RequestParam(defaultValue = "1") int page,
            @Parameter(description = "姣忛〉鏉℃暟", required = false) @RequestParam(defaultValue = "20") int size) {
        Page<User> users = userService.listUsers(PageRequest.of(Math.max(0, page - 1), size));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "鑾峰彇鐢ㄦ埛璇︽儏", description = "鏍规嵁 ID 鏌ヨ鐢ㄦ埛淇℃伅")
    public ResponseEntity<?> getUser(
            @Parameter(description = "鐢ㄦ埛 ID", required = true) @PathVariable Long id) {
        java.util.Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.badRequest().body(Map.of("message", "鐢ㄦ埛涓嶅瓨鍦?));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "鍒涘缓鐢ㄦ埛", description = "鐢辫秴绾х鐞嗗憳鎴栫鐞嗗憳鍒涘缓鏂扮敤鎴?)
    public ResponseEntity<?> createUser(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody @Valid CreateUserRequest request) {

        Role operatorRole = Role.valueOf(principal.role());
        Map<String, Object> result = userService.createUser(
                operatorRole, request.getUsername(), request.getEmail(),
                request.getPassword(), request.getRole());

        if (result.containsKey("message") && ((String) result.get("message")).contains("鎴愬姛")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "鏇存柊鐢ㄦ埛", description = "鏇存柊鐢ㄦ埛鍩烘湰淇℃伅锛堢敤鎴峰悕銆侀偖绠便€佽鑹诧級")
    public ResponseEntity<?> updateUser(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "鐢ㄦ埛 ID", required = true) @PathVariable Long id,
            @RequestBody @Valid UpdateUserRequest request) {

        Role operatorRole = Role.valueOf(principal.role());
        Map<String, String> result = userService.updateUser(
                operatorRole, principal.userId(), id, request.getUsername(),
                request.getEmail(), request.getRole());

        if (result.containsKey("message") && result.get("message").contains("鎴愬姛")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @Operation(summary = "鍒犻櫎鐢ㄦ埛", description = "浠呰秴绾х鐞嗗憳鍙垹闄ょ敤鎴凤紝涓斾笉鑳藉垹闄よ嚜宸辨垨鏈€鍚庝竴涓秴绾х鐞嗗憳")
    public ResponseEntity<?> deleteUser(
            @Parameter(hidden = true) @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(description = "鐢ㄦ埛 ID", required = true) @PathVariable Long id) {

        Role operatorRole = Role.valueOf(principal.role());
        Map<String, String> result = userService.deleteUser(operatorRole, principal.userId(), id);

        if (result.containsKey("message") && result.get("message").contains("鎴愬姛")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    // ===== 璇锋眰浣?DTO 绫?=====

    public static class InitUserRequest {
        @Schema(description = "鐢ㄦ埛鍚?, requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "璇疯緭鍏ョ敤鎴峰悕")
        @Size(min = 2, max = 50, message = "璇疯緭鍏ョ敤鎴峰悕")
        private String username;

        @Schema(description = "閭鍦板潃", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "璇疯緭鍏ラ偖绠?)
        @Email(message = "璇疯緭鍏ユ纭殑閭鏍煎紡")
        @Size(max = 100, message = "璇疯緭鍏ラ偖绠?)
        private String email;

        @Schema(description = "瀵嗙爜", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "璇疯緭鍏ュ瘑鐮?)
        @Size(min = 6, max = 100, message = "璇疯緭鍏ュ瘑鐮?)
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class CreateUserRequest {
        @Schema(description = "鐢ㄦ埛鍚?, requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "鐢ㄦ埛鍚嶄笉鑳戒负绌?)
        @Size(min = 2, max = 50, message = "鐢ㄦ埛鍚嶉暱搴﹀簲鍦?-50涔嬮棿")
        private String username;

        @Schema(description = "閭鍦板潃", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "閭涓嶈兘涓虹┖")
        @Email(message = "閭鏍煎紡涓嶆纭?)
        @Size(max = 100, message = "閭闀垮害涓嶈兘瓒呰繃100")
        private String email;

        @Schema(description = "瀵嗙爜", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "瀵嗙爜涓嶈兘涓虹┖")
        @Size(min = 6, max = 100, message = "瀵嗙爜闀垮害搴斿湪6-100涔嬮棿")
        private String password;

        @Schema(description = "瑙掕壊锛歋UPERADMIN / ADMIN / USER / GUEST", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
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
                principal.getId(), request.getOldPassword(), request.getNewPassword());
        if (result.containsKey("message") && result.get("message").contains("成功")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }
public static class UpdateUserRequest {
        @Schema(description = "鐢ㄦ埛鍚?, requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String username;

        @Schema(description = "閭鍦板潃", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private String email;

        @Schema(description = "瑙掕壊锛歋UPERADMIN / ADMIN / USER / GUEST", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
        private Role role;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
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
}