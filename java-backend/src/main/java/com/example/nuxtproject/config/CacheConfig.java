package com.example.nuxtproject.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 缓存配置
 * <p>
 * 启用 Spring 缓存抽象，使用基于 ConcurrentMap 的本地缓存管理器。
 * 适用于单机部署场景，通过 @Cacheable 等注解简化缓存逻辑。
 */
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }
}
