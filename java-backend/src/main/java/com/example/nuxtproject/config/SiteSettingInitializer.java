package com.example.nuxtproject.config;

import com.example.nuxtproject.entity.SiteSetting;
import com.example.nuxtproject.repository.SiteSettingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * 站点设置默认值初始化器 — 首次启动时插入默认配置项。
 */
@Component
public class SiteSettingInitializer implements CommandLineRunner {

    private final SiteSettingRepository repo;

    public SiteSettingInitializer(SiteSettingRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {
        initIfAbsent("site_name", "CodeBlog");
        initIfAbsent("site_description", "基于 Nuxt + Spring Boot 构建的博客 CMS 系统");
        initIfAbsent("site_logo", "");
        initIfAbsent("icp_number", "蒙ICP备2026006795号-1");
    }

    private void initIfAbsent(String key, String value) {
        if (repo.findBySettingKey(key).isEmpty()) {
            repo.save(new SiteSetting(key, value));
            System.out.println("[SiteSettingInit] 初始化默认值: " + key + " = " + value);
        }
    }
}
