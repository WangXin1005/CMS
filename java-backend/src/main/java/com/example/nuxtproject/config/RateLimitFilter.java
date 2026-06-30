package com.example.nuxtproject.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 简易内存限流过滤器
 * 对登录和用户名检查端点进行频率限制，防止暴力破解和用户枚举攻击。
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    /** 每个 IP 的请求记录：时间戳 -> 计数 */
    private final Map<String, RateWindow> buckets = new ConcurrentHashMap<>();

    /** 限流窗口大小（毫秒） */
    private static final long WINDOW_MS = 60_000;
    /** 每个窗口最大请求数（登录） */
    private static final int LOGIN_MAX = 5;
    /** 每个窗口最大请求数（用户名检查） */
    private static final int CHECK_MAX = 10;

    private static final String LOGIN_PATH = "/api/auth/login";
    private static final String CHECK_USERNAME_PATH = "/api/users/check-username";

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.equals(LOGIN_PATH) && !path.equals(CHECK_USERNAME_PATH);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {
        String ip = getClientIP(request);
        String path = request.getRequestURI();
        int maxRequests = path.equals(LOGIN_PATH) ? LOGIN_MAX : CHECK_MAX;

        long now = System.currentTimeMillis();
        RateWindow window = buckets.compute(ip, (k, v) -> {
            if (v == null || now - v.timestamp > WINDOW_MS) {
                return new RateWindow(now, 1);
            }
            v.count++;
            return v;
        });

        if (window.count > maxRequests) {
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write(
                "{\"code\":429,\"message\":\"请求过于频繁，请稍后重试\"}"
            );
            return;
        }

        chain.doFilter(request, response);
    }

    private String getClientIP(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        String xReal = request.getHeader("X-Real-IP");
        if (xReal != null && !xReal.isBlank()) {
            return xReal;
        }
        return request.getRemoteAddr();
    }

    private static class RateWindow {
        final long timestamp;
        int count;
        RateWindow(long timestamp, int count) {
            this.timestamp = timestamp;
            this.count = count;
        }
    }
}