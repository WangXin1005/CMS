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
 * 对登录、用户名检查、评论提交等敏感端点进行频率限制，防止暴力破解、用户枚举和垃圾评论
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    /** 每个 IP 的请求记录：时间戳 -> 计数 */
    private final Map<String, RateWindow> buckets = new ConcurrentHashMap<>();

    /** 限流窗口大小（毫秒） */
    private static final long WINDOW_MS = 60_000;

    /** 每个窗口最大请求数 */
    private static final int LOGIN_MAX = 5;         // 登录：5次/分钟
    private static final int CHECK_MAX = 10;         // 用户名检查：10次/分钟
    private static final int COMMENT_MAX = 6;        // 评论提交：6次/分钟

    private static final String LOGIN_PATH = "/api/auth/login";
    private static final String CHECK_USERNAME_PATH = "/api/users/check-username";

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        String method = request.getMethod();
        boolean isLogin = path.equals(LOGIN_PATH);
        boolean isCheckUsername = path.equals(CHECK_USERNAME_PATH);
        return !isLogin && !isCheckUsername;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {
        String ip = getClientIP(request);
        String path = request.getRequestURI();
        int maxRequests;

        if (path.equals(LOGIN_PATH)) {
            maxRequests = LOGIN_MAX;
        } else if (path.equals(CHECK_USERNAME_PATH)) {
            maxRequests = CHECK_MAX;
        } else {
            maxRequests = COMMENT_MAX;
        }

        long now = System.currentTimeMillis();
        // 清理过期条目，防止内存泄漏
        if (buckets.size() > 1000) {
            buckets.entrySet().removeIf(e -> now - e.getValue().timestamp > WINDOW_MS);
        }
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

    /** 获取客户端真实 IP（支持反向代理） */
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