package com.example.nuxtproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Nuxt 项目后端启动入口
 * <p>
 * 使用 Spring Boot 自动配置，启动内嵌 Web 容器并提供 RESTful API。
 */
@SpringBootApplication
public class NuxtProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(NuxtProjectApplication.class, args);
    }
}
