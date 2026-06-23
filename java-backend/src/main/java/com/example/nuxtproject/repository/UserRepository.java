package com.example.nuxtproject.repository;

import com.example.nuxtproject.entity.Role;
import com.example.nuxtproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 用户数据访问层
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /** 根据角色判断是否存在该角色的用户 */
    boolean existsByRole(Role role);

    /** 根据用户名或邮箱查找用户（一次查询，用于登录） */
    @Query("SELECT u FROM User u WHERE u.username = :login OR u.email = :login")
    Optional<User> findByUsernameOrEmail(@Param("login") String login);

    /** 根据用户名查找用户 */
    Optional<User> findByUsername(String username);

    /** 根据邮箱查找用户 */
    Optional<User> findByEmail(String email);

    /** 判断邮箱是否已存在 */
    boolean existsByEmail(String email);

    /** 统计指定角色的用户数量 */
    long countByRole(Role role);

    /** 根据角色分页查询用户 */
    org.springframework.data.domain.Page<User> findByRole(Role role, org.springframework.data.domain.Pageable pageable);
}
