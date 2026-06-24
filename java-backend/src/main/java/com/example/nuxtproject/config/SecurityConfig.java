package com.example.nuxtproject.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security 安全配置
 * <p>
 * 配置说明：
 * <ul>
 *   <li>无状态会话（RESTful 风格，不使用 Session）</li>
 *   <li>公开接口：超级管理员检查、初始化、登录、访客注册、Swagger 文档</li>
 *   <li>其他 API 需通过 JWT 认证</li>
 *   <li>使用 @EnableMethodSecurity 配合 @PreAuthorize 实现细粒度角色控制</li>
 * </ul>
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 启用 CORS（使用 CorsConfigurationSource Bean 配置）
            .cors(cors -> {})

            // 禁用 CSRF（无状态 REST API 不需要 CSRF 保护）
            .csrf(csrf -> csrf.disable())

            // 无状态会话（每次请求独立验证，不创建 HttpSession）
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 未认证请求返回 401 JSON 响应
            .exceptionHandling(exceptions ->
                    exceptions.authenticationEntryPoint((request, response, authException) -> {
                        response.setContentType("application/json;charset=UTF-8");
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("{\"code\":401,\"message\":\"未授权，请先登录\"}");
                    })
            )

            // 接口权限配置
            .authorizeHttpRequests(auth -> auth
                // ===== 公开接口（无需认证） =====
                // CMS 内容展示
                .requestMatchers(
                    "/api/articles",
                    "/api/articles/**",
                    "/api/categories",
                    "/api/categories/**",
                    "/api/tags",
                    "/api/tags/**",
                    "/api/comments/article/**",
                    "/api/comments"
                ).permitAll()
                // 静态文件（上传的图片）
                .requestMatchers("/api/media/files/**").permitAll()
                // 检查超级管理员是否存在（前端登录页首次加载时调用）
                .requestMatchers("/api/users/check").permitAll()
                // 初始化超级管理员（仅系统首次部署时可用）
                .requestMatchers("/api/users/init").permitAll()
                // 检查用户名是否已存在
                .requestMatchers("/api/users/check-username").permitAll()
                // 用户登录
                .requestMatchers("/api/auth/login").permitAll()
                // 访客自助注册
                .requestMatchers("/api/auth/register").permitAll()
                // Swagger / SpringDoc 接口文档
                .requestMatchers(
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/api-docs/**",
                        "/swagger-resources/**",
                        "/webjars/**"
                ).permitAll()
                // Spring 内部错误转发路径
                .requestMatchers("/error").permitAll()
                // 其他所有 /api/** 接口需认证
                .anyRequest().authenticated()
            )

            // 在 Spring Security 默认的 UsernamePasswordAuthenticationFilter 之前插入 JWT 过滤器
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }

    /**
     * 密码编码器：使用 BCrypt 强哈希算法加密存储密码
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}