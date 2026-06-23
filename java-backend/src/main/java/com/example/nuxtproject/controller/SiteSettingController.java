package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.SiteSetting;
import com.example.nuxtproject.repository.SiteSettingRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/settings")
@Tag(name = "站点设置", description = "站点配置信息的读写接口")
public class SiteSettingController {

    private final SiteSettingRepository siteSettingRepository;

    public SiteSettingController(SiteSettingRepository siteSettingRepository) {
        this.siteSettingRepository = siteSettingRepository;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "获取所有设置", description = "返回所有站点配置项")
    public ResponseEntity<List<SiteSetting>> listAll() {
        return ResponseEntity.ok(siteSettingRepository.findAll());
    }

    @PutMapping("/{key}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "更新设置", description = "更新指定配置项的值")
    public ResponseEntity<?> update(
            @Parameter(description = "配置项的键名", required = true) @PathVariable String key,
            @RequestBody Map<String, String> body) {
        String value = body.get("value");
        SiteSetting setting = siteSettingRepository.findBySettingKey(key)
                .orElse(new SiteSetting(key, value));
        setting.setSettingValue(value);
        siteSettingRepository.save(setting);
        return ResponseEntity.ok(Map.of("message", "设置保存成功"));
    }
}
