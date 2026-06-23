package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Role;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 检查系统中是否存在超级管理员
     */
    public boolean existsSuperAdmin() {
        return userRepository.existsByRole(Role.SUPERADMIN);
    }

    /**
     * 初始化超级管理员（仅当系统中尚无超级管理员时可用）
     * 系统首次部署时必须先调用此接口创建初始超级管理员
     */
    public Map<String, String> initSuperAdmin(String username, String email, String password) {
        if (userRepository.existsByRole(Role.SUPERADMIN)) {
            return Map.of("message", "超级管理员已存在，不能重复初始化");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return Map.of("message", "用户名已被使用");
        }

        if (userRepository.existsByEmail(email)) {
            return Map.of("message", "邮箱已被使用");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.SUPERADMIN);
        userRepository.save(user);

        return Map.of("message", "超级管理员初始化成功");
    }

    /**
     * 分页查询用户列表
     */
    public Page<User> listUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    /**
     * 根据 ID 查询用户
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * 创建用户
     *
     * @param operatorRole 操作者的角色
     * @param username     用户名
     * @param email        邮箱
     * @param password     密码
     * @param targetRole   要创建的用户角色
     */
    public Map<String, Object> createUser(Role operatorRole, String username,
                                          String email, String password, Role targetRole) {
        if (targetRole == null) {
            return Map.of("message", "必须指定用户角色");
        }

        // 角色权限校验：只有 SUPERADMIN 能创建 ADMIN，任何人都不能创建 SUPERADMIN
        if (targetRole == Role.SUPERADMIN) {
            return Map.of("message", "不允许直接创建超级管理员");
        }
        if (targetRole == Role.ADMIN && operatorRole != Role.SUPERADMIN) {
            return Map.of("message", "只有超级管理员才能创建管理员账号");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return Map.of("message", "用户名已被使用");
        }
        if (userRepository.existsByEmail(email)) {
            return Map.of("message", "邮箱已被使用");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(targetRole);
        userRepository.save(user);

        return Map.of("message", "用户创建成功", "userId", user.getId());
    }

    /**
     * 更新用户信息
     *
     * @param operatorRole 操作者的角色
     * @param operatorId   操作者的用户 ID（用于自操作校验）
     * @param id           目标用户 ID
     * @param username     新用户名（null 表示不修改）
     * @param email        新邮箱（null 表示不修改）
     * @param role         新角色（null 表示不修改）
     */
    public Map<String, String> updateUser(Role operatorRole, Long operatorId,
                                          Long id, String username, String email, Role role) {
        User target = userRepository.findById(id).orElse(null);
        if (target == null) {
            return Map.of("message", "用户不存在");
        }

        // 校验操作者是否有权管理目标用户（基于目标当前角色）
        String error = validateOperation(operatorRole, target.getRole());
        if (error != null) {
            return Map.of("message", error);
        }

        // 校验角色变更权限
        if (role != null && role != target.getRole()) {
            if (role == Role.SUPERADMIN && operatorRole != Role.SUPERADMIN) {
                return Map.of("message", "无权将用户提升为超级管理员");
            }
            if (role == Role.ADMIN && operatorRole != Role.SUPERADMIN) {
                return Map.of("message", "只有超级管理员才能将用户设为管理员");
            }
            target.setRole(role);
        }

        if (username != null && !username.equals(target.getUsername())) {
            if (userRepository.findByUsername(username).isPresent()) {
                return Map.of("message", "用户名已被使用");
            }
            target.setUsername(username);
        }

        if (email != null && !email.equals(target.getEmail())) {
            if (userRepository.existsByEmail(email)) {
                return Map.of("message", "邮箱已被使用");
            }
            target.setEmail(email);
        }

        userRepository.save(target);
        return Map.of("message", "用户信息更新成功");
    }

    /**
     * 删除用户
     *
     * @param operatorRole 操作者的角色
     * @param operatorId   操作者的用户 ID（用于自操作校验）
     * @param id           目标用户 ID
     */
    @Transactional
    public Map<String, String> deleteUser(Role operatorRole, Long operatorId, Long id) {
        // 禁止删除自己
        if (operatorId.equals(id)) {
            return Map.of("message", "不能删除自己的账号");
        }

        User target = userRepository.findById(id).orElse(null);
        if (target == null) {
            return Map.of("message", "用户不存在");
        }

        // 校验操作者是否有权管理目标用户
        String error = validateOperation(operatorRole, target.getRole());
        if (error != null) {
            return Map.of("message", error);
        }

        // 禁止删除最后一个超级管理员
        if (target.getRole() == Role.SUPERADMIN && userRepository.countByRole(Role.SUPERADMIN) <= 1) {
            return Map.of("message", "系统必须至少保留一个超级管理员");
        }

        userRepository.delete(target);
        return Map.of("message", "用户删除成功");
    }

    /**
     * 访客自助注册
     * 注册后自动获得 GUEST 角色，拥有只读权限
     */
    public Map<String, String> registerGuest(String username, String email, String password) {
        // 访客注册需要系统已有超级管理员
        if (!userRepository.existsByRole(Role.SUPERADMIN)) {
            return Map.of("message", "系统尚未初始化，无法注册");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return Map.of("message", "用户名已被使用");
        }

        if (userRepository.existsByEmail(email)) {
            return Map.of("message", "邮箱已被使用");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.GUEST);
        userRepository.save(user);

        return Map.of("message", "访客注册成功，请登录");
    }

    /**
     * 校验操作者是否有权操作目标用户
     * 规则：SUPERADMIN > ADMIN > USER > GUEST
     *
     * @param operatorRole 操作者角色
     * @param targetRole   目标用户当前角色
     * @return 如果无权操作返回错误信息，否则返回 null
     */
    private String validateOperation(Role operatorRole, Role targetRole) {
        if (operatorRole == Role.SUPERADMIN) {
            return null; // 超级管理员可以操作任何人
        }
        if (operatorRole == Role.ADMIN) {
            // 管理员不能操作超级管理员和其他管理员
            if (targetRole == Role.SUPERADMIN || targetRole == Role.ADMIN) {
                return "无权操作超级管理员或其他管理员";
            }
            return null;
        }
        // 普通用户和访客无权管理
        return "无操作权限";
    }
}
