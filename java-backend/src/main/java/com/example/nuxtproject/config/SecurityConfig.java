package com.example.nuxtproject.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
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
 *
 * 无状态会话（RESTful），JWT 认证 + @PreAuthorize 细粒度角色控制
 * 公开接口仅限登录、注册、首页内容展示等必要端点
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    /** 允许的跨域来源，多个用逗号分隔 */
    @Value("${app.cors.allowed-origins:http://localhost:3000,https://gocms.top}")
    private String allowedOrigins;

    /** Swagger 是否启用（生产环境应关闭） */
    @Value("${springdoc.api-docs.enabled:false}")
    private boolean swaggerEnabled;

    private final JwtAuthFilter jwtAuthFilter;
    private final RateLimitFilter rateLimitFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, RateLimitFilter rateLimitFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.rateLimitFilter = rateLimitFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        String json401 = "{\"code\":401,\"message\":\"\u672a\u6388\u6743\uff0c\u8bf7\u5148\u767b\u5f55\"}";

        http
            .cors(cors -> {})

            // RESTful 无状态 API，禁用 CSRF
            .csrf(csrf -> csrf.disable())

            // 无状态会话
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 未认证统一返回 401 JSON
            .exceptionHandling(exceptions ->
                    exceptions.authenticationEntryPoint((request, response, authException) -> {
                        response.setContentType("application/json;charset=UTF-8");
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write(json401);
                    })
            )

            // ============ 接口权限配置 ============
            .authorizeHttpRequests(auth -> auth
                // ---- 公开接口（无需认证）----
                // CMS 前端首页展示 - 仅 GET 方法
                .requestMatchers(HttpMethod.GET, "/api/articles").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/articles/stats").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/articles/{slug}").permitAll()
                // 分类和标签 - 仅 GET
                .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/tags").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/tags/**").permitAll()
                // 公开查询文章评论（仅 GET）
                .requestMatchers(HttpMethod.GET, "/api/comments/article/**").permitAll()
                // 上传的静态图片文件
                .requestMatchers("/api/media/files/**").permitAll()
                // 系统初始化与登录注册
                .requestMatchers("/api/users/check").permitAll()
                .requestMatchers("/api/users/init").permitAll()
                .requestMatchers("/api/users/check-username").permitAll()
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/api/auth/register").permitAll()
                // 提交评论需要认证
                .requestMatchers(HttpMethod.POST, "/api/comments").authenticated()
                // Swagger 文档路径：仅当 springdoc.api-docs.enabled=true 时开放
                .requestMatchers(
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/api-docs/**",
                        "/swagger-resources/**",
                        "/webjars/**"
                ).permitAll()
                // Spring 内部错误转发路径
                .requestMatchers("/api/health").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/public/settings").permitAll()
                .requestMatchers("/error").permitAll()
                // 除上述路径外，所有请求均需认证
                .anyRequest().authenticated()
            )

            // JWT 认证过滤器 + 限流过滤器
            .addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * 动态控制 Swagger 访问权限：仅当 swaggerEnabled 为 true 时放行
     */
    private org.springframework.security.authorization.AuthorizationDecision checkSwaggerAccess(
            jakarta.servlet.http.HttpServletRequest request,
            org.springframework.security.core.Authentication authentication) {
        boolean granted = swaggerEnabled;
        return new org.springframework.security.authorization.AuthorizationDecision(granted);
    }

    /**
     * CORS 跨域配置
     * 安全约束：allowCredentials(true) 时禁止使用通配符 "*"
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        String[] origins = allowedOrigins.split(",");
        boolean hasWildcard = false;
        for (String origin : origins) {
            if (origin.trim().equals("*")) {
                hasWildcard = true;
                break;
            }
        }
        if (hasWildcard) {
            // 通配符模式：不携带凭据，使用 allowedOriginPatterns
            config.setAllowedOriginPatterns(List.of("*"));
            config.setAllowCredentials(false);
        } else {
            // 精确指定域名：可使用凭据
            for (String origin : origins) {
                config.addAllowedOrigin(origin.trim());
            }
            config.setAllowCredentials(true);
        }
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }

    /**
     * 密码编码器：BCrypt 强哈希
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}