package com.example.nuxtproject.config;

import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.entity.UserPrincipal;
import com.example.nuxtproject.repository.UserRepository;
import com.example.nuxtproject.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

/**
 * JWT 认证过滤器
 * <p>
 * 从 Cookie（auth_token）或请求头（Authorization: Bearer）中提取 JWT，
 * 验证签名和过期时间，然后从数据库加载用户并比对 tokenVersion（用于令牌吊销），
 * 最后将认证信息设置到 SecurityContext 中供后续请求处理使用。
 * <p>
 * 优先从 Cookie 取值（支持 Nuxt useCookie 方案），
 * 兼容旧版通过 Authorization 请求头发送 Token 的方式。
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    /** Cookie 名称，与前端 useCookie("auth_token") 保持一致 */
    private static final String TOKEN_COOKIE_NAME = "auth_token";

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.equals("/api/users/check")
            || path.equals("/api/users/init")
            || path.equals("/api/auth/login")
            || path.equals("/api/auth/register");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String token = extractToken(request);

            if (token != null && jwtUtil.validateToken(token)) {
                Claims claims = jwtUtil.parseToken(token);
                Long userId = Long.parseLong(claims.getSubject());
                Integer tokenVersion = claims.get("tokenVersion", Integer.class);

                // 从数据库加载用户，验证 tokenVersion 是否匹配（用于令牌吊销）
                User user = userRepository.findById(userId).orElse(null);

                if (user != null && user.getTokenVersion().equals(tokenVersion)) {
                    // 构建认证主体，角色带 ROLE_ 前缀（如 ROLE_SUPERADMIN）
                    UserPrincipal principal = new UserPrincipal(userId, claims.get("username", String.class), claims.get("role", String.class));
                    List<SimpleGrantedAuthority> authorities = List.of(
                            new SimpleGrantedAuthority(principal.getRoleWithPrefix()));

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(principal, null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            logger.error("JWT authentication error", e);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * 提取 JWT Token
     * <p>
     * 优先级：Cookie > Authorization 请求头
     * <ol>
     *   <li>优先读取名为 "auth_token" 的 Cookie（支持 Nuxt useCookie 方案）</li>
     *   <li>回退读取 Authorization: Bearer 请求头（兼容旧版前端）</li>
     * </ol>
     */
    private String extractToken(HttpServletRequest request) {
        // 优先从 Cookie 中获取 Token（Nuxt useCookie 方案）
        String token = extractTokenFromCookie(request);
        if (token != null) {
            return token;
        }
        // 回退：从 Authorization 请求头获取（兼容旧版前端）
        return extractTokenFromHeader(request);
    }

    /**
     * 从 Cookie 中提取名为 "auth_token" 的值
     */
    private String extractTokenFromCookie(HttpServletRequest request) {
        jakarta.servlet.http.Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                if (TOKEN_COOKIE_NAME.equals(cookie.getName())) {
                    String value = cookie.getValue();
                    if (StringUtils.hasText(value)) {
                        return value;
                    }
                }
            }
        }
        return null;
    }

    /**
     * 从请求头中提取 Bearer Token
     */
    private String extractTokenFromHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
