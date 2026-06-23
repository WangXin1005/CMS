package com.example.nuxtproject.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

/**
 * 全局异常处理器
 * <p>
 * 统一处理控制器层抛出的异常，返回结构化的 JSON 错误响应。
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 处理 @Valid 参数校验失败异常
     * <p>
     * 从 BindingResult 中提取第一条校验失败信息，以 JSON 格式返回 400 响应。
     *
     * @param ex 参数校验异常，包含所有字段的校验错误信息
     * @return 包含错误信息的 400 响应
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getDefaultMessage())
                .findFirst()
                .orElse("参数校验失败");
        return ResponseEntity.badRequest().body(Map.of("message", message));
    }
}
