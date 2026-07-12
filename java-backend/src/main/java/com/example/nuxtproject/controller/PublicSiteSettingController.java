package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.SiteSetting;
import com.example.nuxtproject.repository.SiteSettingRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 公开站点设置控制器 — 无需认证，供前台页面读取。
 */
@RestController
@RequestMapping("/api/public/settings")
@Tag(name = "公开站点设置", description = "无需登录的站点配置读取接口")
public class PublicSiteSettingController {

    private final SiteSettingRepository siteSettingRepository;

    public PublicSiteSettingController(SiteSettingRepository siteSettingRepository) {
        this.siteSettingRepository = siteSettingRepository;
    }

    @GetMapping
    @Operation(summary = "获取所有站点设置", description = "返回所有站点配置项，供公开页面渲染使用")
    public ResponseEntity<List<SiteSetting>> listAll() {
        return ResponseEntity.ok(siteSettingRepository.findAll());
    }
}
