package com.example.nuxtproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 健康检查控制器 — 供 Docker healthcheck 和监控使用
 */
@RestController
public class HealthController {

    /**
     * 健康检查端点，返回服务状态和当前时间
     *
     * @return 包含状态、时间戳和版本信息的 Map
     */
    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "timestamp", LocalDateTime.now().toString(),
            "version", "1.0.0"
        ));
    }
}
