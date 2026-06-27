package com.example.nuxtproject.controller;

import com.example.nuxtproject.entity.Tag;
import com.example.nuxtproject.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@io.swagger.v3.oas.annotations.tags.Tag(name = "标签管理", description = "文章标签的公开查询与管理接口")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/api/tags")
    @Operation(summary = "获取所有标签", description = "公开接口，返回所有标签列表")
    public ResponseEntity<List<Tag>> listAll() {
        return ResponseEntity.ok(tagService.listAll());
    }

    @GetMapping("/api/tags/{slug}")
    @Operation(summary = "获取标签详情", description = "公开接口，通过 Slug 获取标签信息")
    public ResponseEntity<?> getBySlug(
            @Parameter(description = "标签 Slug", required = true) @PathVariable String slug) {
        Tag tag = tagService.getBySlug(slug);
        if (tag == null) {
            return ResponseEntity.status(404).body(Map.of("message", "标签不存在"));
        }
        return ResponseEntity.ok(tag);
    }

    @PostMapping("/api/admin/tags")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "创建标签", description = "创建新的文章标签")
    public ResponseEntity<?> create(@RequestBody @Valid CreateTagRequest request) {
        Tag tag = tagService.create(request.getName(), request.getSlug());
        if (tag == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Slug 已被使用"));
        }
        return ResponseEntity.ok(Map.of("message", "标签创建成功", "id", tag.getId()));
    }

    @PutMapping("/api/admin/tags/{id}")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    @Operation(summary = "更新标签", description = "更新标签信息")
    public ResponseEntity<?> update(
            @Parameter(description = "标签 ID", required = true) @PathVariable Long id,
            @RequestBody @Valid CreateTagRequest request) {
        Tag updated = tagService.update(id, request.getName(), request.getSlug());
        if (updated == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "标签不存在"));
        }
        return ResponseEntity.ok(Map.of("message", "标签更新成功"));
    }

    @DeleteMapping("/api/admin/tags/{id}")
    @PreAuthorize("hasRole('SUPERADMIN')")
    @Operation(summary = "删除标签", description = "仅超级管理员可删除标签")
    public ResponseEntity<?> delete(
            @Parameter(description = "标签 ID", required = true) @PathVariable Long id) {
        if (tagService.delete(id)) {
            return ResponseEntity.ok(Map.of("message", "标签删除成功"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "标签不存在"));
    }

    public static class CreateTagRequest {
        @Schema(description = "标签名称", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "标签名称不能为空")
        @Size(max = 50, message = "标签名称长度不能超过50")
        private String name;

        @Schema(description = "标签 Slug（URL 唯一标识）", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "Slug 不能为空")
        @Size(max = 100, message = "Slug 长度不能超过100")
        private String slug;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
}
}
