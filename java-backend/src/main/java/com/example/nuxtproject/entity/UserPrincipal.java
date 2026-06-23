package com.example.nuxtproject.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "当前登录用户身份信息")
public record UserPrincipal(
    @Schema(description = "用户 ID") Long userId,
    @Schema(description = "用户名") String username,
    @Schema(description = "角色名称（如 SUPERADMIN）") String role
) {

    public String getRoleWithPrefix() {
        return "ROLE_" + role;
    }
}
