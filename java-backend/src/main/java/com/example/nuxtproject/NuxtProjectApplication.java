package com.example.nuxtproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.TimeZone;

/**
 * Nuxt 项目后端启动入口
 * <p>
 * 使用 Spring Boot 自动配置，启动内嵌 Web 容器并提供 RESTful API。
 */
@SpringBootApplication
public class NuxtProjectApplication {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Shanghai"));
        SpringApplication.run(NuxtProjectApplication.class, args);
    }
}
