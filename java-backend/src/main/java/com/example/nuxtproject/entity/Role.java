package com.example.nuxtproject.entity;

/**
 * 用户角色枚举
 * <p>
 * 角色权限层级：SUPERADMIN > ADMIN > USER > GUEST
 * <ul>
 *   <li>SUPERADMIN - 超级管理员，拥有系统全部权限，系统中仅能存在一个</li>
 *   <li>ADMIN - 管理员，可管理 USER 和 GUEST 用户，可查看系统数据</li>
 *   <li>USER - 普通用户，可登录并使用系统功能</li>
 *   <li>GUEST - 访客，可自助注册，仅拥有只读权限</li>
 * </ul>
 */
public enum Role {
    SUPERADMIN,
    ADMIN,
    USER,
    GUEST
}
