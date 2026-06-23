package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.UserRepository;
import com.example.nuxtproject.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * 认证服务
 * 处理用户登录认证和 Token 颁发
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * 用户登录
     * 支持用户名或邮箱作为登录凭证，验证通过后返回 JWT Token、用户名和角色
     *
     * @param login    用户名或邮箱
     * @param password 明文密码
     * @return 包含 token、username、role 的 Map；认证失败返回 null
     */
    public Map<String, Object> login(String login, String password) {
        // 根据用户名或邮箱查找用户
        User user = userRepository.findByUsernameOrEmail(login)
                .orElse(null);

        // 验证用户是否存在及密码是否匹配
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return null;
        }

        // 生成 JWT Token，携带用户 ID、用户名、Token 版本号和角色
        String token = jwtUtil.generateToken(
                user.getId(), user.getUsername(), user.getTokenVersion(), user.getRole().name());

        // 返回登录结果，前端需要存储 role 用于权限判断
        return Map.of(
                "token", token,
                "username", user.getUsername(),
                "role", user.getRole().name()
        );
    }
}
